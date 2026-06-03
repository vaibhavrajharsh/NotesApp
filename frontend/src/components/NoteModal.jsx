import React, { useState, useEffect } from 'react';

const COLORS = ['default', 'coral', 'cobalt', 'lavender', 'amber', 'emerald'];

export default function NoteModal({ isOpen, onClose, onSave, note }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('default');
  const [pinned, setPinned] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Sync state with note prop when modal opens/changes
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setDesc(note.desc || '');
      setColor(note.color || 'default');
      setPinned(note.pinned || false);
      setTags(Array.isArray(note.tags) ? [...note.tags] : []);
    } else {
      setTitle('');
      setDesc('');
      setColor('default');
      setPinned(false);
      setTags([]);
    }
    setTagInput('');
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const cleanTag = tagInput.replace(/,/g, '').trim();
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      desc: desc.trim(),
      color,
      pinned,
      tags
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md transition-opacity duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[600px] bg-slate-900/95 border border-white/10 p-8 rounded-3xl shadow-2xl shadow-black/50 transform scale-100 transition-all duration-300 max-h-[90vh] overflow-y-auto animate-slideup">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-title">
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="note-title" className="font-title text-xs font-semibold uppercase tracking-wider text-slate-400">Title</label>
            <input
              type="text"
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note an inspiring title..."
              required
              autoComplete="off"
              className="bg-black/25 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary focus:shadow-[0_0_10px_rgba(99,102,241,0.15)] transition-all w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="note-desc" className="font-title text-xs font-semibold uppercase tracking-wider text-slate-400">Description</label>
            <textarea
              id="note-desc"
              rows="5"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write down your thoughts, plans, or code here..."
              required
              className="bg-black/25 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary focus:shadow-[0_0_10px_rgba(99,102,241,0.15)] transition-all w-full resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-title text-xs font-semibold uppercase tracking-wider text-slate-400">Accent Color</label>
            <div className="flex gap-3 flex-wrap py-1">
              {COLORS.map(c => {
                let colorClass = '';
                if (c === 'default') colorClass = 'bg-slate-500';
                else if (c === 'coral') colorClass = 'bg-red-400';
                else if (c === 'cobalt') colorClass = 'bg-blue-400';
                else if (c === 'lavender') colorClass = 'bg-purple-400';
                else if (c === 'amber') colorClass = 'bg-amber-400';
                else if (c === 'emerald') colorClass = 'bg-emerald-400';

                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${colorClass} ${
                      color === c ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  >
                    {color === c && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md shadow-black/20"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-title text-xs font-semibold uppercase tracking-wider text-slate-400">Tags</label>
            <div className="flex flex-col gap-3 bg-black/20 border border-white/5 rounded-2xl p-4">
              <div className="flex flex-wrap gap-1.5 min-h-[20px] items-center">
                {tags.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">No tags added yet</span>
                ) : (
                  tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/8 border border-white/5 text-white"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </span>
                  ))
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add tag (Press Enter or comma)"
                  className="bg-transparent border-b border-white/10 text-white text-xs py-1.5 flex-1 outline-none focus:border-brand-primary transition-all placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/5 text-white hover:bg-brand-primary hover:border-brand-primary rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-white/5 pt-5 mt-2">
            <div className="flex items-center gap-3">
              <span className="font-title text-xs font-semibold uppercase tracking-wider text-slate-400">Pin this note</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 border border-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary peer-checked:after:bg-white peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-white/10 text-white hover:bg-white/5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-primary text-white hover:bg-indigo-500 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
              >
                Save Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
