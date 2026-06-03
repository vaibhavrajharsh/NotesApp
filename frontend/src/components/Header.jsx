import React from 'react';

export default function Header({ searchQuery, onSearchChange, onCreateClick }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-900/45 border border-white/5 backdrop-blur-2xl rounded-3xl p-4 sm:px-6 sm:py-4 shadow-2xl shadow-black/35">
      <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 flex-1 max-w-full sm:max-w-[480px] focus-within:border-brand-primary focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)] transition-all">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, body, or tags..."
          className="bg-transparent border-none text-white text-sm w-full outline-none placeholder:text-slate-500"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-stretch sm:items-center">
        <button
          type="button"
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-white text-sm font-semibold rounded-2xl shadow-[0_4px_14px_0_rgba(99,102,241,0.4)] hover:bg-indigo-500 hover:shadow-[0_6px_20px_0_rgba(99,102,241,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer w-full sm:w-auto"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Create Note</span>
        </button>
      </div>
    </header>
  );
}
