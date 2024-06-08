/*  2024-06-06 07:05:57


*/

import React, { useEffect } from "react";
import TodoList from "../../components/TodoList";
// ver01 import
import {
  useIonicStateContext,
  useIonicDispatchContext,
} from "@/app/contexts/context/ver01/useIonicContext";

const TodoListExport = () => {
  // ver01 Code
  const { currentUser, todos } = useIonicStateContext();
  const { setCurrentUser, loadTodos, addTodo, deleteTodo, updateTodo } =
    useIonicDispatchContext();

  console.log(currentUser, todos);

  return (
    <TodoList
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      loadTodos={loadTodos}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      updateTodo={updateTodo}
      todos={todos}
    />
  );
};

export default TodoListExport;
