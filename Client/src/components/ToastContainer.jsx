import React from 'react';

const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 md:slide-in-from-right-5 fade-in pointer-events-auto ${
            toast.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
              : toast.type === 'error'
              ? 'bg-red-950/80 border-red-500/30 text-red-300'
              : 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300'
          }`}
        >
          <span className="text-base">
            {toast.type === 'success' ? '✨' : toast.type === 'error' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
