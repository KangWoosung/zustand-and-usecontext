/*  2024-06-06 06:39:31

2024-06-05 04:40:29
선택적 구독 selective subscription 의 필요성
선택적 구독은 특히 상태 관리 라이브러리 (예: Zustand, Redux 등)와 함께 사용할 때 중요한 개념입니다.
모든 상태를 구독하면 상태가 조금이라도 변경될 때마다 컴포넌트가 리렌더링되어 퍼포먼스 저하, 무한 리렌더링에 빠질 수 있습니다. 
특히 애플리케이션의 규모가 커질 때, 선택적 구독이 중요합니다. 

*/

import { useTodoStore } from "@/app/contexts/zustand/hooks/useTodoStore";
import React, { useState } from "react";
import TodoList from "@/app/features/components/TodoList";

const TodoListExport = () => {
  // 뭉터기 구독 폐기!!!  2024-06-05 04:37:15
  // const { currentUser, setCurrentUser, loadTodos, deleteTodo, updateTodo } =     useTodoStore();
  // 중요함!!!
  // 선택적 구독!!!
  const { currentUser, setCurrentUser } = useTodoStore();
  const loadTodos = useTodoStore((state) => state.loadTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const todos = useTodoStore((state) => state.todos);
  const [addMode, setAddMode] = useState<boolean>(false);

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
