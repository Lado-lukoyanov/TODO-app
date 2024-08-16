import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { DatePicker, Input, Button, Form } from "antd";
import moment from "moment";

import { dateToFormattedString } from "@/lib/utils/date-to-formatted-string.util";
import { addTodo } from "@/store/todo/slice";

export const TodoForm = () => {
  const [text, setText] = useState("");
  const [date, setDate] = useState<moment.Moment | null>(null);
  const dispatch = useDispatch();

  const onSubmit = (value: FormEvent) => {
    value.preventDefault();

    if (date) {
      const formattedDate = dateToFormattedString(date.toDate());
      dispatch(
        addTodo({
          text,
          date: formattedDate,
        })
      );
      setText("");
      setDate(null);
    }
  };

  const isFormValid = text.trim() !== "" && date !== null;

  return (
    <Form onSubmitCapture={onSubmit} labelCol={{ span: 8 }} style={{ padding: "20px", width: "100%" }}>
      <Form.Item style={{ marginBottom: "16px" }}>
        <Input
          type="text"
          placeholder="Что нужно сделать?"
          value={text}
          onChange={(event) => setText(event.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: "16px" }}>
        <DatePicker
          format="DD.MM.YYYY"
          placeholder="Выберите день"
          value={date}
          onChange={(date) => setDate(date)}
          style={{ width: "100%", padding: "10px" }}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit" disabled={!isFormValid} style={{ width: "100%", padding: "10px" }}>
          Добавить задачу
        </Button>
      </Form.Item>
    </Form>
  );
};
