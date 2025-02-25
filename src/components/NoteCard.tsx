import React from "react";
import { format } from "date-fns";
import { Pencil, StickyNote, Trash2 } from "lucide-react";
import { Note } from "../types";
import { useStore } from "../store";

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit }) => {
  const deleteNote = useStore((state) => state.deleteNote);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(note.id);
    }
  };

  return (
    <div className="border border-gray-600 text-black hover:text-white rounded-lg p-4 hover:bg-[#363846] group cursor-pointer">
      <div className="flex flex-col justify-between items-start mb-2">
        <div className="flex ml-auto space-x-2 opacity-0 group-hover:opacity-100">
          <button onClick={onEdit} className="transition-colors">
            <Pencil size={18} />
          </button>
          <button onClick={handleDelete} className="transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
        <div className="flex w-full items-center gap-2">
          <StickyNote size={24} />
          <h3 className="font-medium truncate">{note.title}</h3>
          <p className="text-sm  ml-auto">
            {format(new Date(note.createdAt), "M/d/yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};
