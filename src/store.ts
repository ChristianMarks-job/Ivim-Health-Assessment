import { create } from "zustand";
import { Note, ApiError } from "./types";
import { api } from "./api";

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: ApiError | null;
  selectedNote: Note | null;
  isModalOpen: boolean;
  fetchNotes: () => Promise<void>;
  createNote: (title: string, description: string) => Promise<void>;
  updateNote: (id: string, title: string, description: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setSelectedNote: (note: Note | null) => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useStore = create<NotesState>((set, get) => ({
  notes: [],
  isLoading: false,
  error: null,
  selectedNote: null,
  isModalOpen: false,

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const notes = await api.getNotes();
      set({ notes, isLoading: false });
    } catch (error: any) {
      set({
        error: {
          message: "Failed to fetch notes",
          status: error?.response?.status || 500,
        },
        isLoading: false,
      });
    }
  },

  createNote: async (title: string, description: string) => {
    set({ isLoading: true, error: null });
    try {
      const newNote = await api.createNote(title, description);
      set((state) => ({
        notes: [...state.notes, newNote],
        isLoading: false,
        isModalOpen: false,
      }));
    } catch (error: any) {
      set({
        error: {
          message: "Failed to create note",
          status: error?.response?.status || 500,
        },
        isLoading: false,
      });
    }
  },

  updateNote: async (id: string, title: string, description: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.updateNote(id, title, description);
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, title, description } : note
        ),
        isLoading: false,
        isModalOpen: false,
        selectedNote: null,
      }));
    } catch (error: any) {
      set({
        error: {
          message: "Failed to update note",
          status: error?.response?.status || 500,
        },
        isLoading: false,
      });
    }
  },

  deleteNote: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteNote(id);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
        isLoading: false,
        selectedNote: null,
        isModalOpen: false,
      }));
    } catch (error: any) {
      set({
        error: {
          message: "Failed to delete note",
          status: error?.response?.status || 500,
        },
        isLoading: false,
      });
    }
  },

  setSelectedNote: (note: Note | null) => {
    set({ selectedNote: note, isModalOpen: !!note });
  },

  setModalOpen: (isOpen: boolean) => {
    set({
      isModalOpen: isOpen,
      selectedNote: isOpen ? get().selectedNote : null,
    });
  },
}));
