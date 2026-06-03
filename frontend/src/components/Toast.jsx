import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-2 animate-bounce-short">
      <div
        className={`px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          type === 'success'
            ? 'bg-slate-800/90 border-white/10 shadow-black/40'
            : 'bg-red-600/90 border-red-500/20 shadow-red-950/20'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
