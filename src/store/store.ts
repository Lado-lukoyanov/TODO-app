import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "@/store/todo/slice";

export const store = configureStore({
  reducer: {
    todos: reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["todo/addFiles"],
        ignoredActionPaths: ["payload.files"],
        ignoredPaths: ["todos.files"],
      },
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
