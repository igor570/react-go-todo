import { Box, List, ListItem } from "@chakra-ui/react";
import useSWR from "swr";
import { ENDPOINT } from "./lib/constants";
import AddTodo from "./components/AddTodo";
import { Todo } from "./lib/types";
import { markTodoComplete, deleteTodo } from "./lib/functions";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((response) => response.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  return (
    <>
      <List>
        {data?.map((todo) => {
          return (
            <ListItem
              color={todo.completed ? "red" : "black"}
              onClick={() => markTodoComplete(todo.id, mutate)}
              key={`todo__${todo.id}`}
            >
              {todo.title}
              <Box
                onClick={() => deleteTodo(todo.id, mutate)}
                backgroundColor="purple"
                width={"1rem"}
                height={"1rem"}
              ></Box>
            </ListItem>
          );
        })}
      </List>
      <AddTodo mutate={mutate} />
    </>
  );
}

export default App;
