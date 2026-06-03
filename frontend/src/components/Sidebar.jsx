import React from 'react';

export default function Sidebar({ activeFilter, onFilterChange, totalNotesCount, pinnedNotesCount, tags }) {
  return (
    <aside className="w-full lg:w-[280px] bg-slate-900/45 border border-white/5 backdrop-blur-2xl rounded-3xl p-6 flex flex-col h-auto lg:h-[calc(100vh-48px)] lg:sticky lg:top-6 shadow-2xl shadow-black/35 z-10 transition-all duration-300">
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span className="font-title text-2xl font-extrabold tracking-tight text-white">Spidey<span className="text-brand-primary">Notes</span></span>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        <button
          type="button"
          onClick={() => onFilterChange('all')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left text-[15px] font-semibold transition-all w-full cursor-pointer border ${
            activeFilter === 'all'
              ? 'bg-white/8 border-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'bg-transparent border-transparent text-slate-400 hover:bg-white/3 hover:text-white'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeFilter === 'all' ? 'text-brand-primary drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]' : ''}>
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>All Notes</span>
          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold border transition-colors ${activeFilter === 'all' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white/5 text-slate-400 border-white/5'}`}>{totalNotesCount}</span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('pinned')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left text-[15px] font-semibold transition-all w-full cursor-pointer border ${
            activeFilter === 'pinned'
              ? 'bg-white/8 border-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'bg-transparent border-transparent text-slate-400 hover:bg-white/3 hover:text-white'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeFilter === 'pinned' ? 'text-brand-primary drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]' : ''}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>Pinned</span>
          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold border transition-colors ${activeFilter === 'pinned' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white/5 text-slate-400 border-white/5'}`}>{pinnedNotesCount}</span>
        </button>

        <div className="mt-6 lg:mt-8">
          <h3 className="font-title text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3 px-4">Tags / Categories</h3>
          <div className="flex flex-row flex-wrap lg:flex-col gap-1 max-h-[140px] lg:max-h-[180px] overflow-y-auto pr-1">
            {tags.length === 0 ? (
              <div className="px-4 py-2 text-xs text-slate-500 italic">No tags created</div>
            ) : (
              tags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onFilterChange(`tag:${tag}`)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left w-auto lg:w-full border ${
                    activeFilter === `tag:${tag}`
                      ? 'text-white bg-white/5 border-white/5 font-semibold'
                      : 'text-slate-400 bg-transparent border-transparent hover:bg-white/3 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_6px_var(--color-brand-primary)]"></span>
                  <span>{tag}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </nav>

      <div className="hidden lg:block bg-black/15 border border-white/5 rounded-2xl p-4 mt-auto">
        <div className="font-title text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3 text-center">Dashboard</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center">
            <span className="font-title text-lg font-bold text-white">{totalNotesCount}</span>
            <span className="text-[11px] text-slate-400">Total</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-title text-lg font-bold text-white">{tags.length}</span>
            <span className="text-[11px] text-slate-400">Tags</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
