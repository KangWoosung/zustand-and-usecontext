/*  2024-06-03 07:09:41

RHF, Zod
npm install react-hook-form
npm install @hookform/resolvers
npm install zod

  [
    {
      id: '7730086a-6e6f-41b9-b638-13d38878b16c',
      title: '선택적 구독',
      content: '커스텀 훅에서 선택적 구독이 중요하다',
      isCompleted: true,
      createdAt: '2024-06-04T19:38:30.120Z',
      updatedAt: '2024-06-04T19:46:52.986Z'
    },
    {
      id: '935a8df3-c8fa-4153-9842-e8804022da8d',
      title: 'todos 가 로드되는 시점을 찾아라',
      content: 'loadTodos 가 트리거되지 않았는데...',
      isCompleted: false,
      createdAt: '2024-06-04T19:50:54.288Z',
      updatedAt: '2024-06-04T20:08:40.938Z'
    },
    {
      id: 'e2158a30-d86a-4ba1-a9f0-19438922904c',
      title: '컴플리트 아이콘 추가',
      content: '아이콘에 컬러로 구분',
      isCompleted: false,
      createdAt: '2024-06-04T20:15:31.302Z',
      updatedAt: '2024-06-04T20:15:31.302Z'
    }
  ]

*/
"use client";

import { useTodoStore } from "@/app/contexts/zustand/hooks/useTodoStore";
import { AuthForm } from "@/app/features/zustand";
import { TodoList } from "@/app/features/zustand";
import { loadTodosFromLocalStorage } from "@/app/utils/todosIO";

const ZustandPage = () => {
  const { currentUser, checkAuth, setCurrentUser } = useTodoStore();

  const todos = loadTodosFromLocalStorage();
  console.log(todos);

  return (
    <>
      <div className="item flex flex-col p-6 gap-5 min-w-[70%]">
        <h1>page for zustand</h1>

        {!currentUser && (
          <AuthForm
            currentUser={currentUser}
            checkAuth={checkAuth}
            setCurrentUser={setCurrentUser}
          />
        )}

        {currentUser && <TodoList />}
      </div>
    </>
  );
};

export default ZustandPage;
