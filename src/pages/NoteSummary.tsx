// src/pages/NoteSummary.tsx
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useState, useEffect } from 'react';
import { generateSummary } from '../services/summaryService';

export default function NoteSummary() {
  const { noteId } = useParams<{ noteId: string }>();
  const note = useSelector((state: RootState) => 
    state.notes.items.find(note => note.id === noteId)
  );
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (note) {
      fetchSummary(note.content);
    }
  }, [note]);

  const fetchSummary = async (content: string) => {
    if (!content.trim()) {
      setSummary('No content to summarize');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateSummary(content);
      setSummary(result);
    } catch (err) {
      console.error('Error generating summary:', err);
      setError('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <Link to={`/notes/${note.id}`} className="text-blue-600 hover:underline">
          ← Back to note
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Summary of: {note.title}</h1>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-800">{summary || 'No summary available'}</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Original Text:</h3>
          <div className="bg-gray-50 p-4 rounded text-sm text-gray-600">
            {note.content}
          </div>
        </div>
      </div>
    </div>
  );
}