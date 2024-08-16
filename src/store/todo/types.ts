import { Todo, Weather } from "@/types/types";

export type AddTodoPayload = {
  text: string;
  date: string;
};

export type WeatherWithId = {
  id: number;
  weather: Weather;
};

export type SetTodoDatePayload = {
  id: number;
  date: string;
};

export type AddFilePayload = {
  id: number;
  files: File[];
};

export type CompleteTaskPayload = {
  id: number;
  completedAt: string;
};

export type TodoState = {
  todos: Record<number, Todo>;
  loading: boolean;
  error: string | null;
};
