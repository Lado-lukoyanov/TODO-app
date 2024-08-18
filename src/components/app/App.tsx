import { TodoForm } from "@/components/ui/todo-form";
import { TodoList } from "@/components/ui/todo-list";

import styles from "./app.module.css";

export const App = () => (
  <main>
    <header>
      <h1 className={styles.header}>todos</h1>
    </header>
    <div className={styles.todoViewsContainer}>
      <TodoForm />
      <TodoList />
    </div>
  </main>
);
