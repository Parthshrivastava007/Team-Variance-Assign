import React from 'react';

const EmptyState = ({ searchQuery, onAddClick }) => {
    return (
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-12 text-center max-w-[480px] mx-auto mt-12 relative z-10 animate-in fade-in duration-300">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-bold text-slate-200">No notes found</h3>
            <p className="text-sm text-slate-400 mt-2 mb-6">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by creating your very first note!'}
            </p>
            {!searchQuery && (
                <button
                    onClick={onAddClick}
                    className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                    Create Note
                </button>
            )}
        </div>
    );
};

export default EmptyState;
