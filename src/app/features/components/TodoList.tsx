/*  2024-06-04 07:27:51

2024-06-06 06:33:18
이 코드를 zustand, context 에서 공동으로 사용하려면 어떻게 설계해야 하는가?
주요 펑션과 state 들을 prop 으로 받는 방법 밖엔 없을 것 같다. 

2024-06-08 08:09:22
개별 훅 구독 방식으로 변경 완료.
리렌더 카운트 4.. 로 완전함.


*/

import React, { useEffect, useRef, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import AddTodoForm from "./AddTodoForm";
import { CiSquarePlus } from "react-icons/ci";
import Todo from "./Todo";
import { TodoType } from "@/app/contexts/types/TodoType";

type TodoListProps = {
  currentUser: string | null;
  setCurrentUser: (user: string) => void;
  loadTodos: () => void;
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedFields: Partial<TodoType>) => void;
  todos?: TodoType[];
};

let renderCnt = 0;
const TodoList = ({
  currentUser,
  setCurrentUser,
  loadTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  todos,
}: TodoListProps) => {
  const [addMode, setAddMode] = useState<boolean>(false);

  renderCnt++;
  useEffect(() => {
    loadTodos();
    console.log(todos);
  }, []);
  console.log(renderCnt);

  return (
    <div className="flex flex-col m-auto justify-center w-2/3 p-6">
      <div className="flex flex-row justify-between p-4">
        <h2>
          <span className="text-2xl">{currentUser} </span>
          <span className="font-light ">
            with {todos && todos.length} todos
          </span>
        </h2>
        <div
          onClick={() => setCurrentUser("")}
          className="flex text-right cursor-pointer"
        >
          <IoLogOutOutline size={32} />
        </div>
      </div>
      <h3 className="py-4 px-8 text-lg font-bold">TodoList</h3>
      {todos && todos.length < 1 && (
        <div className="flex flex-col p-4 border-2 rounded-lg">
          No Todos found for {currentUser}
        </div>
      )}
      {todos?.map((todo, index) => (
        <Todo
          key={todo.id}
          todo={todo}
          index={index}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
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
      {addMode && <AddTodoForm addTodo={addTodo} />}
    </div>
  );
};

export default TodoList;
