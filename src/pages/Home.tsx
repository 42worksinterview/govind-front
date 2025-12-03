// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../app/store";
import { addNote, deleteNote, fetchNotes, type Note } from "../features/notes/notesSlice";
import { createNote } from "../services/notesService";

 

export default function Home() {
  const { items: notes, status } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (status === 'idle') {
      // @ts-ignore - We know this is a valid action
      dispatch(fetchNotes());
      
    }
  }, [status, dispatch]);

  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.title.trim() && newNote.content.trim()) {

      createNote({ 
        title: newNote.title,
        content: newNote.content
      });

      dispatch(addNote({ 
        title: newNote.title,
        content: newNote.content
      }));
      setNewNote({ title: "", content: "" });
      setIsFormOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNote(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newNote.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Note title"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newNote.content}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your note here..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setNewNote({ title: "", content: "" });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note: Note) => (
          <li key={note.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Link to={`/notes/${note.id}`} className="block h-full">
              <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                {note.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {note.content}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 hover:underline">View note →</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm('Delete this note?')) {
                      dispatch(deleteNote(note.id));
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}