import { KeyedMutator } from "swr";

export type Todo = {
  id: number;
  title: string;
  body: string;
  completed: boolean;
};

export type createTodoProps = {
  values: { title: string; body: string };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<Todo[]>;
};

export interface TodoItemProps {
  todo: Todo;
  mutate: KeyedMutator<Todo[]>;
}

export type TodoMutateFunction = KeyedMutator<Todo[]>;
