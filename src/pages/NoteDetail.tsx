// src/pages/NoteDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
// import { fetchNotes } from "../services/notesService";
// import axios from 'axios';
// import { useEffect } from 'react';
// import apiClient from "./apiClient";

export default function NoteDetail() {
  const { noteId } = useParams<{ noteId: string }>();
  const note = useSelector((state: RootState) => 
    
    state.notes.items.find(note => note.id === noteId)
  );


  // const response = axios.get<Node[]>(`http://localhost:8000/api/notes/${noteId}`);
  // const note =  response;

//  const response = axios.get<Note[]>(`http://localhost:8000/api/notes/${noteId}`);
  

  if (!note) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to all notes
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to all notes
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line text-gray-800">{note.content}</p>
        </div>
      </div>
    </div>
  );
}