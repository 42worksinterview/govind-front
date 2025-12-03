import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NoteDetail from "../pages/NoteDetail";
import NoteSummary from "../pages/NoteSummary";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes/:noteId" element={<NoteDetail />} />
      <Route path="/notes/:noteId/summary" element={<NoteSummary />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}