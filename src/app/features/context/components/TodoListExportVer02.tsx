/*  2024-06-07 14:12:39

context ver02
useIonicReducer 뭉테기 구독 훅을 버리고, 개별 훅을 사용하는 방식으로 변경

// 개별 훅들이 dispatch 액션 펑션들을 리턴한다.
// usage:
// const addTodo = useAddTodo();
// addTodo({newTodo});

*/

import React, { useEffect } from "react";
import TodoList from "../../components/TodoList";

// ver02 import
import {
  useTodos,
  useAddTodo,
  useDeleteTodo,
  useUpdateTodo,
  useLoadTodos,
  useCurrentUser,
  useSetCurrentUser,
  useAuthChecked,
} from "@/app/contexts/context/";

const TodoListExport = () => {
  // ver02 Code
  const todos = useTodos();
  const addTodo = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const loadTodos = useLoadTodos();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const authChecked = useAuthChecked();

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
