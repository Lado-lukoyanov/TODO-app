export const getNoTasksMessage = (filterValue: string): string => {
  if (filterValue === "completed") return "Нет Выполненных задач";
  if (filterValue === "active") return "Нет Активных задач";

  return "Нет задач";
};
