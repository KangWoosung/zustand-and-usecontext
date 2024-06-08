// InitialState 의 타입을 정의

import { TodoType } from "./TodoType";

export type InitialTodoType = {
  todos: TodoType[];
};
export type InitialContextStateType = {
  currentUser: string | null;
  authChecked: boolean;
  todos: TodoType[];
};
export type InitialContextDispatchType = {
  checkAuth: (check: boolean) => void;
  setCurrentUser: (user: string) => void;
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedFields: Partial<TodoType>) => void;
  loadTodos: () => void;
};

export type InitialStateType = InitialContextStateType &
  InitialContextDispatchType;

// export type InitialStateType = {
//   currentUser: string | null;
//   userAuth: boolean;
//   isLoading: boolean;
//   isError: boolean;
//   todos: TodoType[];
//   checkAuth: (check: boolean) => boolean;
//   setCurrentUser: (user: string) => void;
//   addTodo: (todo: TodoType) => void;
//   deleteTodo: (id: string) => void;
//   updateTodo: (id: string, updatedFields: Partial<TodoType>) => void;
//   loadTodos: () => TodoType[];
// };
