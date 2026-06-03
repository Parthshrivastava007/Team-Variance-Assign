import React from 'react';

const Header = ({ searchQuery, setSearchQuery, onAddClick }) => {
    return (
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-12 relative z-10">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                    Brainwave Notes
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-medium">Organize your thoughts beautifully</p>
            </div>

            <div className="flex gap-4 items-center w-full sm:w-auto">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search notes..."
                    className="bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-[220px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                    onClick={onAddClick}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:-translate-y-[1px] active:translate-y-[1px] transition-all cursor-pointer whitespace-nowrap"
                >
                    + New Note
                </button>
            </div>
        </header>
    );
};

export default Header;
