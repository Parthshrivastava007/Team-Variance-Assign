const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes = [
    {
        id: 1,
        title: "Welcome to Notes App",
        content: "This is an in-memory note. Feel free to create new ones, update this, or delete it!",
        createdAt: "2026-06-03"
    },
    {
        id: 2,
        title: "React State & Fetching Tip",
        content: "Always run fetch inside useEffect with an empty dependency array to fetch only once.",
        createdAt: "2026-06-03"
    }
];

let nextId = 3;

const getFormattedDate = () => {
    return new Date().toISOString().split('T')[0];
};

//Rest APIs

// 1. GET /api/notes - Retrieve all notes
app.get('/api/notes', (req, res) => {
    try {
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// 2. GET /api/notes/:id - Retrieve a single note by ID
app.get('/api/notes/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id, 10);
        const note = notes.find(n => n.id === noteId);

        if (!note) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

// 3. POST /api/notes - Create a new note
app.post('/api/notes', (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content || title.trim() === '' || content.trim === '') {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const newNote = {
            id: nextId++,
            title: title.trim(),
            content: content.trim(),
            createdAt: getFormattedDate()
        };
        notes.push(newNote);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// 4. PUT /api/notes/:id - Update an existing note
app.put('/api/notes/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id, 10);
        if (isNaN(noteId)) {
            return res.status(400).json({ error: 'Invalid note ID format' });
        }
        const { title, content } = req.body;
        const note = notes.find(n => n.id === noteId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        if (title === undefined && content === undefined) {
            return res.status(400).json({ error: 'Please provide a title or content to update' });
        }

        if (title !== undefined)
            note.title = title.trim();
        if (content !== undefined) {
            note.content = content.trim();
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// 5. DELETE /api/notes/:id - Delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id, 10);
        if (isNaN(noteId)) {
            return res.status(400).json({ error: 'Invalid note ID format' });
        }

        const noteIndex = notes.findIndex(n => n.id === noteId);
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        notes.splice(noteIndex, 1);
        res.status(200).json({ message: 'Note deleted successfully', id: noteId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});