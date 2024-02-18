import { Box, Card, CardHeader, Heading } from "@chakra-ui/react";
import AddTodo from "./AddTodo";
import { Todo } from "../lib/types";
import { KeyedMutator } from "swr";

export const Header = ({ mutate }: { mutate: KeyedMutator<Todo[]> }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="2rem"
      >
        <Box
          display="flex"
          alignItems="center"
          columnGap="2rem"
          justifyContent="flex-start"
        >
          <Card>
            <CardHeader>
              <Heading size="md">Todo List</Heading>
            </CardHeader>
          </Card>
          <AddTodo mutate={mutate} />
        </Box>
      </Box>
    </>
  );
};
