// TodoItem.tsx
import { Box, Card, CardHeader, CardBody, Text } from "@chakra-ui/react";
import { markTodoComplete, deleteTodo } from "../lib/functions";
import { TodoItemProps } from "../lib/types";

export const TodoItem = ({ todo, mutate }: TodoItemProps) => {
  return (
    <Card
      marginX="20rem"
      minWidth="600px"
      minHeight="75px"
      padding="1rem"
      marginTop="1rem"
      display="flex"
      flexDirection="row"
      alignItems="center"
      key={`todo__${todo.id}`}
    >
      <CardHeader textDecoration={todo.completed ? "line-through" : "none"}>
        {todo.title}
      </CardHeader>
      <CardBody textDecoration={todo.completed ? "line-through" : "none"}>
        <Text _hover={{ cursor: "pointer" }}>{todo.body}</Text>
      </CardBody>
      <Box
        onClick={() => markTodoComplete(todo.id, mutate)}
        background="green"
        padding="0.5rem"
        borderRadius="5px"
        _hover={{ cursor: "pointer", background: "darkgreen" }}
        textColor="white"
        marginRight="1rem"
      >
        <Text>Mark Complete</Text>
      </Box>
      <Box
        onClick={() => deleteTodo(todo.id, mutate)}
        background="red"
        padding="0.5rem"
        borderRadius="5px"
        _hover={{ cursor: "pointer", background: "darkred" }}
        textColor="white"
      >
        <Text>Delete</Text>
      </Box>
    </Card>
  );
};

export default TodoItem;
