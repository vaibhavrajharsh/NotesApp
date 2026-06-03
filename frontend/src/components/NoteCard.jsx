import React from 'react';

export default function NoteCard({ note, onCardClick, onPinClick, onDeleteClick, index }) {
  // Format Date Helper
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' • ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const dateText = formatDate(note.updatedAt || note.createdAt);

  return (
    <div
      onClick={onCardClick}
      style={{ animationDelay: `${index * 0.05}s` }}
      className={`note-card-border note-card-glow relative bg-slate-900/45 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 shadow-xl shadow-black/15 min-h-[220px] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 animate-slideup accent-${note.color || 'default'} ${note.pinned ? 'pinned' : ''}`}
    >
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-title text-[18px] font-bold leading-tight text-white break-words w-full">
          {note.title || 'Untitled Note'}
        </h3>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPinClick(note._id, note.pinned);
          }}
          title={note.pinned ? 'Unpin note' : 'Pin note'}
          className={`p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center ${
            note.pinned 
              ? 'text-[var(--note-accent,var(--color-brand-primary))] drop-shadow-[0_0_3px_var(--note-accent)]' 
              : 'text-slate-500 hover:text-white'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={note.pinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
      </div>

      <div className="text-sm leading-relaxed text-slate-350 flex-1 break-words whitespace-pre-wrap line-clamp-6 overflow-hidden">
        {note.desc}
      </div>

      {Array.isArray(note.tags) && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {note.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/3 text-slate-400 transition-all hover:bg-white/8"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-3">
        <span className="text-[11px] font-medium text-slate-500 font-sans">{dateText}</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(note._id);
            }}
            title="Delete Note"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer flex items-center justify-center"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
