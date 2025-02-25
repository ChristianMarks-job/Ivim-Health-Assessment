export interface Note {
  id: string;
  title: string;
  description: string;
  createAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}
