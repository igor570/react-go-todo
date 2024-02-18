import { createTodoProps } from "./types";
import { ENDPOINT } from "./constants";
import { TodoMutateFunction } from "./types";

//Create a new todo
export const createTodo = async ({
  values,
  setOpen,
  setTodo,
  setBody,
  mutate,
}: createTodoProps) => {
  const updated = await fetch(`${ENDPOINT}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((response) => response.json());
  mutate(updated);
  setTodo("");
  setBody("");
  setOpen(false);
};

//Complete a todo
export const markTodoComplete = async (
  id: number,
  mutate: TodoMutateFunction
) => {
  const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
    method: "PATCH",
  }).then((response) => response.json());
  if (!updated) return;
  mutate(updated);
};

//Delete a todo

export const deleteTodo = async (id: number, mutate: TodoMutateFunction) => {
  const updated = await fetch(`${ENDPOINT}/api/todos/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
  mutate(updated);
};
