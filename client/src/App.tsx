import useSWR from "swr";
import { ENDPOINT } from "./lib/constants";
import { Header } from "./components/Header";
import { Todo } from "./lib/types";
import { TodoItem } from "./components/TodoItem";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((response) => response.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  return (
    <>
      <Header mutate={mutate} />
      {data?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} mutate={mutate} />
      ))}
    </>
  );
}

export default App;
