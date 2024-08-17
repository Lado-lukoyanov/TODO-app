import { useState } from "react";
import { useSelector } from "react-redux";

import { TodoItem } from "@/components/ui/todo-item";
import { Segmented, Typography } from "antd";

import { selectTodoData } from "@/store/todo/selectors";
import { filteredTodos } from "@/lib/utils/filtered-todos.util";
import { getNoTasksMessage } from "@/lib/utils/get-no-tasks-message.util";

import styles from "./todo-list.module.css";

import type { Todo } from "@/types/types";

const options = [
  { label: "Все", value: "all" },
  { label: "Активные", value: "active" },
  { label: "Выполненные", value: "completed" },
];

export const TodoList = () => {
  const [filter, setFilter] = useState("all");
  const todoMap = useSelector(selectTodoData);
  const todos: Todo[] = Object.values(todoMap);

  return (
    <>
      <Segmented
        options={options}
        onChange={(value) => {
          setFilter(value);
        }}
        block
      />
      {!filteredTodos(todos, filter).length && (
        <Typography.Title level={2} className={styles.todoListText}>
          {getNoTasksMessage(filter)}
        </Typography.Title>
      )}
      {filteredTodos(todos, filter).map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};
