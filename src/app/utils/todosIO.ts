/*  2024-06-03 12:25:36


*/

import { TodoType } from "../contexts/types/TodoType";

// Helper function to load Todos from LocalStorage
export const loadTodosFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
};
// Helper function to save Todos to LocalStorage
export const saveTodosToLocalStorage = (todos: TodoType[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};
