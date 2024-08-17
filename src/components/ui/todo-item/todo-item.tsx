import { useSelector } from "react-redux";

import { Checkbox, Upload, Button, Spin, Typography, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { CardTitle } from "@/components/ui/card-title";
import { WeatherCard } from "@/components/ui/weather-card";

import cn from "classnames";

import { addFiles, completeTask, completeTodo, removeTodo } from "@/store/todo/slice";
import { loadingWetherData, selectError } from "@/store/todo/selectors";
import { timeToFormattedString } from "@/lib/utils/time-to-formatted-string.util";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { fetchWeatherForMoscow } from "@/store/todo/async-thunk";

import styles from "./todo-item.module.css";

import type { Todo } from "@/types/types";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(loadingWetherData);
  const error = useSelector(selectError);

  const onSelectTodo = () => {
    dispatch(completeTodo(todo.id));
    dispatch(completeTask({ id: todo.id, completedAt: new Date().toISOString() }));
  };

  const onFetchWeather = () => {
    dispatch(fetchWeatherForMoscow(todo.id));
  };

  const onAddFile = (file: UploadChangeParam<UploadFile<File>>) => {
    if (file.fileList) {
      const files = file.fileList.map((file) => file.originFileObj).filter((file) => file) as File[];
      if (files.length > 0) {
        dispatch(addFiles({ id: todo.id, files }));
      }
    }
  };

  const onDeleteTodo = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <Card
      className={cn(styles.todoItemCard, { [styles.completed]: todo.completed })}
      title={<CardTitle onSelectTodo={onSelectTodo} onDeleteTodo={onDeleteTodo} todo={todo} />}
    >
      <div className={styles.todoItemContent}>
        <Checkbox checked={!!todo.weather} onChange={onFetchWeather} disabled={loading} />
        <Typography.Text className={styles.textStyle}>{loading ? <Spin /> : "Указать погоду"}</Typography.Text>
      </div>
      <Upload multiple beforeUpload={() => false} onChange={onAddFile}>
        <Button icon={<UploadOutlined />}>Добавить файл</Button>
      </Upload>
      {todo.weather && (
        <WeatherCard description={todo.weather.weather[0].description} temp={todo.weather.main.temp}></WeatherCard>
      )}
      {todo.completed && (
        <div className={styles.todoItemFooter}>
          <Typography.Text type="secondary">
            Время закрытия задачи: {timeToFormattedString(todo.completedAt || "")}
          </Typography.Text>
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
    </Card>
  );
};
