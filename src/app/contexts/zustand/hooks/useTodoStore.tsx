/*  2024-06-03 06:19:12


*/

import { initialState } from "@/app/data/initialState";
import { create } from "zustand";
import { TodoType } from "../../types/TodoType";
import { InitialStateType } from "../../types/InitialStateType";
import {
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/app/utils/todosIO";

// 2. Zustand 버전의 useStore 훅
export const useTodoStore = create<InitialStateType>((set, get) => ({
  ...initialState,

  checkAuth: () => {
    const currentUser = get().currentUser;
    return currentUser !== null;
  },

  setUser: (user: string) => {
    set(() => ({ currentUser: user }));
    return;
  },

  addTodo: (todo: TodoType) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo];
      saveTodosToLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  },

  deleteTodo: (id: string) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      saveTodosToLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  },

  updateTodo: (id: string, updatedFields: Partial<TodoType>) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedFields, updatedAt: new Date() }
          : todo
      );
      saveTodosToLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  },

  loadTodos: () => {
    set(() => ({ todos: loadTodosFromLocalStorage() }));
  },
}));
