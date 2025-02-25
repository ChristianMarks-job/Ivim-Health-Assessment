import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useStore } from "../store";
import { Note } from "../types";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  note,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { createNote, updateNote } = useStore();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    } else {
      setTitle("");
      setDescription("");
    }
    setError("");
  }, [note, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      if (note) {
        await updateNote(note.id, title, description);
      } else {
        await createNote(title, description);
      }
      onClose();
    } catch (err) {
      setError("Failed to save note");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1C1E26] rounded-lg w-full max-w-lg mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">
              {note ? "Edit Note" : "Create Note"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
                <span className="text-amber-500 ml-1">Required</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#2E303E] border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter note title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Note
                <span className="text-amber-500 ml-1">Required</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#2E303E] border border-gray-600 rounded-md p-2 text-white h-32 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter note description"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                {note ? "Save Changes" : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
