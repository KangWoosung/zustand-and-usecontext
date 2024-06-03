import { TodoType } from "../contexts/types/TodoType";
import useLocalStorage from "./useLocalStorage";

const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<TodoType[]>({
    key: "todos",
    initialValue: [],
  });

  const addTodo = (todo: TodoType) => {
    setTodos((prevTodos: TodoType[]) => [...prevTodos, todo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos: TodoType[]) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const updateTodo = (id: string, updatedTodo: TodoType) => {
    setTodos((prevTodos: TodoType[]) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  return { todos, addTodo, deleteTodo, updateTodo };
};

export default useTodos;
