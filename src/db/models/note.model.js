const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { dbState } = require('../db');

// Schema for Mongoose
const noteSchema = new mongoose.Schema({
    title  : String,
    desc : String,
    pinned : { type: Boolean, default: false },
    color  : { type: String, default: 'default' },
    tags   : { type: [String], default: [] }
}, {
    timestamps: true
});

const mongooseNoteModel = mongoose.model('note', noteSchema);

// File Fallback Details
const FALLBACK_FILE_PATH = path.join(__dirname, '../../../notes_db_fallback.json');

function loadFallbackNotes() {
  try {
    if (!fs.existsSync(FALLBACK_FILE_PATH)) {
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(FALLBACK_FILE_PATH, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading fallback file:', err);
    return [];
  }
}

function saveFallbackNotes(notes) {
  try {
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(notes, null, 2));
  } catch (err) {
    console.error('Error writing fallback file:', err);
  }
}

// Unified API Wrapper to dynamically proxy queries
const noteModel = {
  create: async (data) => {
    if (!dbState.usingFallback) {
      return await mongooseNoteModel.create(data);
    }
    
    const notes = loadFallbackNotes();
    const now = new Date().toISOString();
    const newNote = {
      _id: 'fallback_' + Math.random().toString(36).substr(2, 9),
      title: data.title || '',
      desc: data.desc || '',
      color: data.color || 'default',
      pinned: data.pinned || false,
      tags: data.tags || [],
      createdAt: now,
      updatedAt: now
    };
    
    notes.push(newNote);
    saveFallbackNotes(notes);
    return newNote;
  },

  find: () => {
    if (!dbState.usingFallback) {
      return mongooseNoteModel.find();
    }

    const notes = loadFallbackNotes();
    
    // Return custom chainable object to match Mongoose API (.sort())
    return {
      sort: function(sortConfig) {
        const sorted = [...notes];
        if (sortConfig) {
          sorted.sort((a, b) => {
            // Pinned sorting (true/1 is placed before false/0 for descending)
            if (sortConfig.pinned !== undefined) {
              const pinA = a.pinned ? 1 : 0;
              const pinB = b.pinned ? 1 : 0;
              if (pinA !== pinB) {
                return sortConfig.pinned === -1 ? pinB - pinA : pinA - pinB;
              }
            }
            // Date sorting
            if (sortConfig.updatedAt !== undefined) {
              const dateA = new Date(a.updatedAt || 0).getTime();
              const dateB = new Date(b.updatedAt || 0).getTime();
              return sortConfig.updatedAt === -1 ? dateB - dateA : dateA - dateB;
            }
            return 0;
          });
        }
        return sorted;
      }
    };
  },

  findOneAndDelete: async (filter) => {
    if (!dbState.usingFallback) {
      return await mongooseNoteModel.findOneAndDelete(filter);
    }

    const notes = loadFallbackNotes();
    const index = notes.findIndex(n => n._id === filter._id);
    if (index === -1) return null;
    
    const deletedNote = notes.splice(index, 1)[0];
    saveFallbackNotes(notes);
    return deletedNote;
  },

  findOneAndUpdate: async (filter, update, options) => {
    if (!dbState.usingFallback) {
      return await mongooseNoteModel.findOneAndUpdate(filter, update, options);
    }

    const notes = loadFallbackNotes();
    const index = notes.findIndex(n => n._id === filter._id);
    if (index === -1) return null;

    const note = notes[index];
    const setClause = update.$set || update;

    // Dynamically update fields if provided
    if (setClause.title !== undefined) note.title = setClause.title;
    if (setClause.desc !== undefined) note.desc = setClause.desc;
    if (setClause.color !== undefined) note.color = setClause.color;
    if (setClause.pinned !== undefined) note.pinned = setClause.pinned;
    if (setClause.tags !== undefined) note.tags = setClause.tags;
    
    note.updatedAt = new Date().toISOString();
    
    saveFallbackNotes(notes);
    return note;
  }
};

module.exports = noteModel;