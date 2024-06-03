// InitialState 의 타입을 정의

import { TodoType } from "./TodoType";

export type InitialStateType = {
  currentUser: string | null;
  userAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  todos: TodoType[];
  checkAuth: () => boolean;
  setUser: (user: string) => void;
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: TodoType) => void;
  loadTodos: () => void;
};
