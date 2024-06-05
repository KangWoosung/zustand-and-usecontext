/*  2024-06-05 13:00:58


*/

import { useIonicContext } from "@/app/contexts/context/useIonicContext";
import AuthForm from "@/app/features/AuthForm";
import TodoList from "@/app/features/TodoList";
import React from "react";

const InnerContextPage = () => {
  const { currentUser, checkAuth, setCurrentUser } = useIonicContext();
  return (
    <div className="item flex flex-col p-6 gap-5 min-w-[70%]">
      <h1>page for Context</h1>

      {!currentUser && (
        <AuthForm
          currentUser={currentUser}
          checkAuth={checkAuth}
          setCurrentUser={setCurrentUser}
        />
      )}

      {currentUser && <TodoList />}
    </div>
  );
};

export default InnerContextPage;
