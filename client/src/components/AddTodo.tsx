import {
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { createTodo } from "../lib/functions";
import { TodoMutateFunction } from "../lib/types";

const AddTodo = ({ mutate }: { mutate: TodoMutateFunction }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({
      values: { title: todo, body: body },
      setOpen,
      setTodo,
      setBody,
      mutate,
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add a Todo</Button>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="todo">
                <FormLabel>Todo</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your todo"
                  required
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              </FormControl>
              <FormControl id="body">
                <FormLabel marginTop={"1rem"}>Extra details</FormLabel>
                <Textarea
                  placeholder="Go further..."
                  resize={"none"}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="green" marginTop={"2rem"}>
                Add Todo
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>💘</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTodo;
