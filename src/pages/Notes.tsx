import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../app/store";
import { addNote, deleteNote, fetchNotes, type Note } from "../features/notes/notesSlice";

export default function Notes() {
  // const { items: notes, status, error } = useSelector((state: RootState) => state.notes);
  const { items: notes, status } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      // @ts-ignore - We know this is a valid action
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  const handleAdd = () => {
    dispatch(addNote({ 
      title: "New Note", 
      content: "Write something..." 
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Notes</h1>
      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Note
      </button>
      <ul className="mt-6 space-y-4">
        {notes.map((note: Note) => (
          <li key={note.id} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
            <Link to={`/notes/${note.id}`} className="block mb-2">
              <h2 className="font-semibold text-lg text-blue-600 hover:underline">
                {note.title}
              </h2>
            </Link>
            <p className="text-gray-700 mb-3 line-clamp-2">{note.content}</p>
            <div className="flex justify-between items-center">
              <Link 
                to={`/notes/${note.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                View full note →
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Are you sure you want to delete this note?')) {
                    dispatch(deleteNote(note.id));
                  }
                }} 
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}