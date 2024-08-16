import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchWeatherForMoscow } from "./async-thunk";

import type { Todo } from "@/types/types";
import type {
  AddTodoPayload,
  TodoState,
  SetTodoDatePayload,
  AddFilePayload,
  CompleteTaskPayload,
  WeatherWithId,
} from "./types";

const initialState: TodoState = {
  todos: {},
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        date: action.payload.date,
        files: [],
        weather: null,
      };
      state.todos[newTodo.id] = newTodo;
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      delete state.todos[action.payload];
    },
    setTodoDate: (state, action: PayloadAction<SetTodoDatePayload>) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.date = action.payload.date;
      }
    },
    addFiles: (state, action: PayloadAction<AddFilePayload>) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.files = [
          ...todo.files,
          ...action.payload.files.map((file) => ({ name: file.name, size: file.size, type: file.type })),
        ];
      }
    },
    completeTask: (state, action: PayloadAction<CompleteTaskPayload>) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.completedAt = action.payload.completedAt;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForMoscow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForMoscow.fulfilled, (state, action: PayloadAction<WeatherWithId>) => {
        const todos = state.todos[action.payload.id];
        if (todos) {
          todos.weather = action.payload.weather;
        }
        state.loading = false;
      })
      .addCase(fetchWeatherForMoscow.rejected, (state) => {
        state.loading = false;
        state.error = "";
      });
  },
});

export const { addTodo, completeTodo, setTodoDate, addFiles, completeTask, removeTodo } = todoSlice.actions;

export const reducers = todoSlice.reducer;
