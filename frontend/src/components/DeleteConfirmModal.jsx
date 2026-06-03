import React from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[420px] bg-slate-900/95 border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 animate-slideup">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white font-title">Delete Note</h2>
        </div>
        <div className="mb-6">
          <p className="text-slate-300 text-sm leading-relaxed">
            Are you sure you want to permanently delete this note? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white bg-transparent hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
