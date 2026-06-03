import React from 'react';

const NoteCard = ({ note, onView, onEdit, onDelete }) => {
    const truncateContent = (text) => {
        return text.length > 60 ? text.substring(0, 60) + '...' : text;
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between h-[220px] shadow-2xl hover:-translate-y-1 hover:shadow-indigo-500/5 transition-all duration-300 ease-out group">
            <div>
                <h3 className="text-xl font-bold text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap mb-2 group-hover:text-indigo-400 transition-colors">
                    {note.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 break-words">
                    {truncateContent(note.content)}
                </p>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                <span className="text-xs text-gray-500">{note.createdAt}</span>
                <div className="flex gap-2">
                    <button
                        className="text-xs font-semibold text-gray-400 hover:text-white px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
                        onClick={() => onView(note)}
                    >
                        👁️ View
                    </button>
                    <button
                        className="text-xs font-semibold text-gray-400 hover:text-indigo-400 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
                        onClick={() => onEdit(note)}
                    >
                        ✏️ Edit
                    </button>
                    <button
                        className="text-xs font-semibold text-gray-400 hover:text-red-400 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
                        onClick={() => onDelete(note.id)}
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
