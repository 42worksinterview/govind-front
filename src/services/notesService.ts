import apiClient from "./apiClient";

export const fetchNotes = () => apiClient.get("/notes");
export const createNote = (note: any) => apiClient.post("/notes/store", note);
export const updateNote = (id: string, note: any) => apiClient.put(`/notes/${id}`, note);
export const deleteNotes = (id: string) => apiClient.delete(`/notes/delete/${id}`);
