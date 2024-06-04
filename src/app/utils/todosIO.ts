/*  2024-06-03 12:25:36

await localStorage.setItem 
localStorage 가 비동기 처리 처럼 작동하는 문제를 정확히 해결하지 못하고 있다.
일단은 async await 로 선언해두고 나중에 스택오버플로우를 뒤져보자.

*/

import { TodoType } from "../contexts/types/TodoType";

// Helper function to load Todos from LocalStorage
export const loadTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};
// Helper function to save Todos to LocalStorage
export const saveTodosToLocalStorage = (todos: TodoType[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
