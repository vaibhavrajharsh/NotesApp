import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

export default function App() {
  // Application State Hooks
  const [notes, setNotes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'pinned', or 'tag:TagName'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState(null);
  
  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // REST API Methods (using Axios)
  const fetchNotes = async () => {
    try {
      const res = await axios.get('/notes');
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error('Error fetching notes:', err);
      showToast('Failed to fetch notes from server.', 'error');
    }
  };

  const handleSaveNote = async (noteData) => {
    const isEdit = !!selectedNote;
    const url = isEdit ? `/notes/${selectedNote._id}` : '/notes';

    try {
      if (isEdit) {
        await axios.patch(url, noteData);
      } else {
        await axios.post(url, noteData);
      }
      
      setIsNoteModalOpen(false);
      showToast(isEdit ? 'Note updated successfully' : 'Note created successfully');
      fetchNotes();
    } catch (err) {
      console.error('Error saving note:', err);
      showToast('Error saving your note. Please try again.', 'error');
    }
  };

  const handleTogglePin = async (id, currentPin) => {
    try {
      await axios.patch(`/notes/${id}`, { pinned: !currentPin });
      showToast(!currentPin ? 'Note pinned to top' : 'Note unpinned');
      fetchNotes();
    } catch (err) {
      console.error('Pin toggle error:', err);
      showToast('Failed to pin/unpin note.', 'error');
    }
  };

  const handleDeleteTrigger = (id) => {
    setNoteToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDeleteId) return;
    try {
      await axios.delete(`/notes/${noteToDeleteId}`);
      setIsDeleteModalOpen(false);
      setNoteToDeleteId(null);
      showToast('Note deleted successfully');
      fetchNotes();
    } catch (err) {
      console.error('Delete note error:', err);
      showToast('Failed to delete the note.', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Helper selectors
  const totalNotesCount = notes.length;
  const pinnedNotesCount = notes.filter(n => n.pinned).length;

  // Extract unique tags sorted alphabetically
  const uniqueTags = React.useMemo(() => {
    const set = new Set();
    notes.forEach(note => {
      if (Array.isArray(note.tags)) {
        note.tags.forEach(tag => set.add(tag));
      }
    });
    return Array.from(set).sort();
  }, [notes]);

  // Client-side search and tag filtering engine
  const filteredNotes = React.useMemo(() => {
    let result = [...notes];

    // 1. Sidebar filters
    if (activeFilter === 'pinned') {
      result = result.filter(n => n.pinned);
    } else if (activeFilter.startsWith('tag:')) {
      const tagToFilter = activeFilter.replace('tag:', '');
      result = result.filter(n => Array.isArray(n.tags) && n.tags.includes(tagToFilter));
    }

    // 2. Search filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(note => {
        const titleMatch = note.title && note.title.toLowerCase().includes(q);
        const descMatch = note.desc && note.desc.toLowerCase().includes(q);
        const tagsMatch = Array.isArray(note.tags) && note.tags.some(tag => tag.toLowerCase().includes(q));
        return titleMatch || descMatch || tagsMatch;
      });
    }

    return result;
  }, [notes, activeFilter, searchQuery]);

  return (
    <div className="min-height-screen relative overflow-hidden select-none">
      {/* Decorative Blur Background Orbs */}
      <div className="bg-orb orb-1 absolute w-[40vw] h-[40vw] bg-radial from-brand-primary/20 to-transparent rounded-full filter blur-[120px] top-[-10%] left-[-10%] -z-10 pointer-events-none opacity-25"></div>
      <div className="bg-orb orb-2 absolute w-[35vw] h-[35vw] bg-radial from-note-lavender/25 to-transparent rounded-full filter blur-[120px] bottom-[-5%] right-[-5%] -z-10 pointer-events-none opacity-25"></div>
      <div className="bg-orb orb-3 absolute w-[30vw] h-[30vw] bg-radial from-note-cobalt/25 to-transparent rounded-full filter blur-[120px] top-[40%] left-[30%] -z-10 pointer-events-none opacity-25"></div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-screen p-4 lg:p-6 gap-4 lg:gap-6">
        
        {/* Sidebar Left Component */}
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalNotesCount={totalNotesCount}
          pinnedNotesCount={pinnedNotesCount}
          tags={uniqueTags}
        />

        {/* Main Panel */}
        <main className="flex-1 flex flex-col gap-6">
          
          {/* Header Search & Actions */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateClick={() => {
              setSelectedNote(null);
              setIsNoteModalOpen(true);
            }}
          />

          {/* Filtering Indicator Alert Bar */}
          {activeFilter !== 'all' && (
            <div className="flex justify-between items-center bg-white/3 border border-white/5 rounded-2xl px-5 py-3 animate-slideup">
              <span className="text-sm text-slate-400">
                {activeFilter.startsWith('tag:') 
                  ? `Showing notes filtered by tag "${activeFilter.replace('tag:', '')}"`
                  : 'Showing only pinned notes'
                }
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="text-brand-primary text-sm font-semibold hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Grid Container */}
          <section className="flex-1 flex flex-col">
            {filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-14 bg-slate-900/45 border border-white/5 backdrop-blur-md rounded-3xl max-w-[500px] mx-auto my-20 shadow-2xl shadow-black/20 animate-slideup">
                <div className="w-[100px] h-[100px] rounded-full bg-brand-primary/10 border border-brand-primary/10 flex items-center justify-center mb-6 shadow-[0_0_30px_0_rgba(99,102,241,0.15)] text-brand-primary">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 font-title">No notes found</h2>
                <p className="text-sm text-slate-400 mb-6 max-w-[320px]">
                  Create your first note to get started on your creative journey!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNote(null);
                    setIsNoteModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-all cursor-pointer"
                >
                  Create a Note
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 w-full">
                {filteredNotes.map((note, idx) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    index={idx}
                    onCardClick={() => {
                      setSelectedNote(note);
                      setIsNoteModalOpen(true);
                    }}
                    onPinClick={handleTogglePin}
                    onDeleteClick={handleDeleteTrigger}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Note Form Editor Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        note={selectedNote}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Toast Alert Popups */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
