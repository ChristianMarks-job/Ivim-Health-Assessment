import axios from "axios";
import { Note } from "./types";

const API_URL = "https://issessvim.hievilmath.org/api";
let companyId: string | null = "848143c0-b420-4ab9-9cbc-9066f9d197c7";
const noteUrl = "note";

const Axios = axios.create({
  baseURL: `${API_URL}/company/${companyId}/`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export const api = {
  async getNotes(): Promise<Note[]> {
    if (!companyId) {
      throw new Error("Company ID not set");
    }
    const response = await Axios.get(noteUrl);
    return response.data;
  },

  async createNote(title: string, description: string): Promise<Note> {
    if (!companyId) {
      throw new Error("Company ID not set");
    }
    const response = await Axios.post(noteUrl, {
      title: title,
      description: description,
    });
    return response.data;
  },

  async updateNote(
    id: string,
    title: string,
    description: string
  ): Promise<Note> {
    if (!companyId) {
      throw new Error("Company ID not set");
    }
    const response = await Axios.patch(`${noteUrl}/${id}`, {
      title: title,
      description: description,
    });
    return response.data;
  },

  async deleteNote(id: string): Promise<void> {
    if (!companyId) {
      throw new Error("Company ID not set");
    }
    await Axios.delete(`${noteUrl}/${id}`);
  },
};
