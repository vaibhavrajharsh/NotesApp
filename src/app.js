//app.js used to create the express Server
const express = require("express");
const cors = require("cors");
const path = require("path");
const noteModel = require('./db/models/note.model');

const app = express();

// Enable CORS for API requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Serve static assets from compiled React dist folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// POST /notes - Create a new note
app.post("/notes", async (req, res) => {
  try {
    const data = req.body;
    const newNote = await noteModel.create({
      title: data.title || '',
      desc: data.desc || '',
      color: data.color || 'default',
      pinned: data.pinned || false,
      tags: data.tags || []
    });
    res.status(201).json({ 
      message: "Note created successfully", 
      note: newNote 
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create note", error: err.message });
  }
});

// GET /notes - Get all notes sorted by pinned and updatedAt
app.get("/notes", async (req, res) => {
  try {
    // Sort: pinned first (true/1 before false/0, so descending), then updatedAt descending
    const notes = await noteModel.find().sort({ pinned: -1, updatedAt: -1 });
    res.status(200).json({
      message: "Notes fetched successfully",
      notes: notes
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
});

// Delete /notes/:id - Delete a note by id
app.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await noteModel.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
});

// Patch /notes/:id - Dynamic patch endpoint supporting title, desc, color, pinned, tags
app.patch('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const fieldsToUpdate = {};
    
    // Explicitly check for fields in req.body to avoid overwriting with undefined
    if (req.body.title !== undefined) fieldsToUpdate.title = req.body.title;
    if (req.body.desc !== undefined) fieldsToUpdate.desc = req.body.desc;
    if (req.body.color !== undefined) fieldsToUpdate.color = req.body.color;
    if (req.body.pinned !== undefined) fieldsToUpdate.pinned = req.body.pinned;
    if (req.body.tags !== undefined) fieldsToUpdate.tags = req.body.tags;

    const updatedNote = await noteModel.findOneAndUpdate(
      { _id: id },
      { $set: fieldsToUpdate },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
});

// Catch-all route to serve the React app index.html for non-API requests
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

module.exports = app;
