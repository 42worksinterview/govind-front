import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteNotes } from "../../services/notesService";
import axios from 'axios';
// import { useSelector, useDispatch } from "react-redux";


export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  items: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  // Simulate API call with a small delay
  const response = await axios.get<Note[]>('http://localhost:8000/api/notes');
  const responseData = response.data;
  return new Promise<Note[]>((resolve) => {
    setTimeout(() => {
      resolve(responseData.data);
    }, 500);
  });
});

// export const fetchNotes = createAsyncThunk<Note[]>('notes/fetchNotes', async () => {
//     const response = await axios.get<Note[]>('http://localhost:8000/api/notes');
//     return response.data.data;
//   }
// );

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer(state, action: PayloadAction<Note>) {
        state.items.push(action.payload);
      },
      prepare(note: Omit<Note, 'id'>) {
        return {
          payload: {
            ...note,
            id: Date.now().toString(),
          },
        };
      },
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.items.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      deleteNotes(action.payload);
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch notes';
      });
  },
});

export const { updateNote, deleteNote } = notesSlice.actions;
export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;