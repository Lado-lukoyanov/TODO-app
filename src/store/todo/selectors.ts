import { AppState } from "../store";

export const selectTodoData = (state: AppState) => state.todos.todos;

export const loadingWetherData = (state: AppState) => state.todos.loading;

export const selectError = (state: AppState) => state.todos.error;
