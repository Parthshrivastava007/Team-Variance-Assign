import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ErrorAlert from './components/ErrorAlert';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import EmptyState from './components/EmptyState';
import SkeletonLoader from './components/SkeletonLoader';
import ToastContainer from './components/ToastContainer';

const API_BASE_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  // State to track the ID of the note the user intends to delete
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Toast handler
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // GET /api/notes
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`Status: ${response.statusText}`);
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Could not load notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // POST /api/notes
  const handleCreateNote = async (newNoteData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNoteData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create note');
      }
      const createdNote = await response.json();
      setNotes((prevNotes) => [createdNote, ...prevNotes]);
      setModalMode(null);
      showToast('Note created successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // PUT /api/notes/:id
  const handleUpdateNote = async (updatedNoteData) => {
    if (!selectedNote) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${selectedNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNoteData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update note');
      }
      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
      );
      setModalMode(null);
      setSelectedNote(null);
      showToast('Note updated successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // DELETE /api/notes/:id
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete note');
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      showToast('Note deleted successfully!', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Filter notes search match
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Decorative Blur Background Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-6xl w-full mx-auto px-6 py-12 flex-grow relative z-10">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onAddClick={() => setModalMode('create')} 
        />

        {error && <ErrorAlert error={error} onRetry={fetchNotes} />}

        {loading ? (
          <SkeletonLoader />
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onView={(note) => { setSelectedNote(note); setModalMode('view'); }}
                onEdit={(note) => { setSelectedNote(note); setModalMode('edit'); }}
                onDelete={(id) => setDeleteConfirmId(id)} // Opens custom confirmation
              />
            ))}
          </div>
        ) : (
          <EmptyState searchQuery={searchQuery} onAddClick={() => setModalMode('create')} />
        )}
      </div>

      {/* Main Note Modal (View, Create, Edit) */}
      <NoteModal
        mode={modalMode}
        note={selectedNote}
        onClose={() => { setModalMode(null); setSelectedNote(null); }}
        onSubmit={(noteData) => {
          if (modalMode === 'create') handleCreateNote(noteData);
          else if (modalMode === 'edit') handleUpdateNote(noteData);
        }}
      />

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div 
            className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-[400px] p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-100 mb-4">Delete Note</h3>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this note? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer text-sm"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-red-500/20 transition-all cursor-pointer text-sm"
                onClick={() => {
                  handleDeleteNote(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default App;
