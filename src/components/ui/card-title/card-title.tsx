import { Button, Checkbox, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import cn from "classnames";

import styles from "./card-title.module.css";

import type { Todo } from "@/types/types";

type CardTitleProps = {
  todo: Todo;
  onSelectTodo: () => void;
  onDeleteTodo: () => void;
};

export const CardTitle = ({ onSelectTodo, onDeleteTodo, todo }: CardTitleProps) => {
  return (
    <div className={styles.todoTitle}>
      <div className={styles.titleValue}>
        <Checkbox checked={todo.completed} onChange={onSelectTodo} />
        <Typography.Text
          className={cn(styles.textStyle, { [styles.completed]: todo.completed })}
          onClick={onSelectTodo}
        >
          {todo.text}
        </Typography.Text>
      </div>
      <Button type="primary" danger icon={<DeleteOutlined />} onClick={onDeleteTodo} />
    </div>
  );
};
