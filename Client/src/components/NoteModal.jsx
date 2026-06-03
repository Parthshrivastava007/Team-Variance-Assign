import React, { useState, useEffect } from 'react';

const NoteModal = ({ mode, note, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (note && (mode === 'edit' || mode === 'view')) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setTitle('');
            setContent('');
        }
        setValidationError('');
    }, [note, mode]);

    if (!mode) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setValidationError('Both title and content are required.');
            return;
        }
        onSubmit({ title, content });
    };

    return (
        <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-[550px] p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {mode === 'view' ? (
                    /* ================= VIEW MODE ================= */
                    <>
                        <h2 className="text-2xl font-bold text-gray-100 mb-6">{note?.title}</h2>
                        <div className="max-h-[350px] overflow-y-auto pr-2">
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{note?.content}</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
                            <span className="text-xs text-gray-500">Created: {note?.createdAt}</span>
                            <button
                                className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    /* ================= CREATE/EDIT MODE ================= */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-100">
                            {mode === 'create' ? 'Create New Note' : 'Edit Note'}
                        </h2>

                        {validationError && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-2.5 rounded-xl text-sm">
                                ⚠️ {validationError}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="modal-title" className="text-xs font-semibold text-gray-400">Title</label>
                            <input
                                id="modal-title"
                                type="text"
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                placeholder="Enter note title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="modal-content" className="text-xs font-semibold text-gray-400">Content</label>
                            <textarea
                                id="modal-content"
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all min-height-[150px] resize-y"
                                placeholder="Enter note details..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                            <button
                                type="button"
                                className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all"
                            >
                                {mode === 'create' ? 'Add Note' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default NoteModal;
