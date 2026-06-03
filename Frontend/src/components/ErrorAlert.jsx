import React from 'react';

const ErrorAlert = ({ error, onRetry }) => {
    return (
        <div className="bg-red-500/15 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl mb-8 flex justify-between items-center animate-in fade-in duration-300 relative z-10">
            <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                    <p className="font-semibold text-sm">Failed to connect to backend API</p>
                    <p className="text-xs opacity-80">{error}</p>
                </div>
            </div>
            <button
                onClick={onRetry}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
                Retry Connection
            </button>
        </div>
    );
};

export default ErrorAlert;
