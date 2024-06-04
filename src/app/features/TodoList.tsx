/*  2024-06-04 07:27:51

2024-06-05 04:40:29
선택적 구독 selective subscription 의 필요성
선택적 구독은 특히 상태 관리 라이브러리 (예: Zustand, Redux 등)와 함께 사용할 때 중요한 개념입니다.
모든 상태를 구독하면 상태가 조금이라도 변경될 때마다 컴포넌트가 리렌더링되어 퍼포먼스 저하, 무한 리렌더링에 빠질 수 있습니다. 
특히 애플리케이션의 규모가 커질 때, 선택적 구독이 중요합니다. 


*/

import React, { useEffect, useRef, useState } from "react";
import { useTodoStore } from "../contexts/zustand/hooks/useTodoStore";
import { IoLogOutOutline } from "react-icons/io5";
import AddTodoForm from "./AddTodoForm";
import { CiSquarePlus } from "react-icons/ci";
import Todo from "./Todo";

let renderCnt = 0;
const TodoList = () => {
  // 뭉터기 구독 폐기!!!  2024-06-05 04:37:15
  // const { currentUser, setCurrentUser, loadTodos, deleteTodo, updateTodo } =     useTodoStore();
  // 중요함!!!
  // 선택적 구독!!!
  const { currentUser, setCurrentUser } = useTodoStore();
  const loadTodos = useTodoStore((state) => state.loadTodos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const todos = useTodoStore((state) => state.todos);
  const [addMode, setAddMode] = useState<boolean>(false);

  renderCnt++;
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);
  console.log(renderCnt);

  return (
    <div className="flex flex-col m-auto justify-center w-2/3 p-6">
      <div className="flex flex-row justify-between p-4">
        <h2>
          <span className="text-2xl">{currentUser} </span>
          <span className="font-light ">with {todos.length} todos</span>
        </h2>
        <div
          onClick={() => setCurrentUser("")}
          className="flex text-right cursor-pointer"
        >
          <IoLogOutOutline size={32} />
        </div>
      </div>
      <h3 className="py-4 px-8 text-lg font-bold">TodoList</h3>
      {todos.length < 1 && (
        <div className="flex flex-col p-4 border-2 rounded-lg">
          No Todos found for {currentUser}
        </div>
      )}
      {todos?.map((todo, index) => (
        <Todo key={todo.id} todo={todo} index={index} deleteTodo={deleteTodo} />
      ))}
      <div
        className="flex flex-row justify-between p-4 border-2 rounded-lg"
        onClick={() => setAddMode((p) => !p)}
      >
        <div>Add New Todo</div>
        <div>
          <CiSquarePlus size={24} />
        </div>
      </div>
      {addMode && <AddTodoForm />}
    </div>
  );
};

export default TodoList;
