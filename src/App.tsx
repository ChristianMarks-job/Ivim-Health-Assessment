import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { useStore } from "./store";
import { NoteCard } from "./components/NoteCard";
import { NoteModal } from "./components/NoteModal";
import { api } from "./api";
import { Note } from "./types";

function App() {
  const {
    notes,
    isLoading,
    error,
    selectedNote,
    isModalOpen,
    fetchNotes,
    setSelectedNote,
    setModalOpen,
  } = useStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  if (isLoading && notes.length === 0) {
    return (
      <div className="min-h-screen bg-[#1C1E26] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1C1E26] flex items-center justify-center">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e1e2e3] p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header
          className="bg-gray-600 flex justify-between items-center px-6 py-2 my-4"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc( 100% - 20px ) 100%, 0 100% )",
          }}
        >
          <button
            onClick={handleCreateNote}
            className="bg-gray-500/30 text-white p-2 rounded-full hover:bg-gray-600 border border-white transition-colors"
          >
            <Plus size={24} />
          </button>
          <h1 className="text-4xl font-bold text-white">NOTiV</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => handleEditNote(note)}
            />
          ))}
          {notes.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No notes yet. Click the + button to create one.
            </div>
          )}
        </div>

        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          note={selectedNote || undefined}
        />
      </div>
    </div>
  );
}

export default App;
