/*  2024-06-05 13:00:58


  // ver02 Code
  const todos = useTodos();
  const addTodo = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const loadTodos = useLoadTodos();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const authChecked = useAuthChecked();
*/

// import {
//   useIonicStateContext,
//   useIonicDispatchContext,
// } from "@/app/contexts/context/";

// ver02 import
// 개별 훅들이 dispatch 액션 펑션들을 리턴한다.
// usage:
// const addTodo = useAddTodo();
// addTodo({newTodo});
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
import { AuthForm } from "@/app/features/context";
import { TodoList } from "@/app/features/context";
import React from "react";

const InnerContextPage = () => {
  // const { currentUser, todos } = useIonicStateContext();
  // const { checkAuth, setCurrentUser } = useIonicDispatchContext();
  // const checkAuth = useAuthChecked();

  // 이렇게 모두 로드 해도 리렌더링은 최소화 되고 있다.
  const todos = useTodos();
  const addTodo = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const loadTodos = useLoadTodos();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const authChecked = useAuthChecked();
  // const checkAuth = useCheckAuth();

  console.log(currentUser, todos);

  return (
    <div className="item flex flex-col p-6 gap-5 min-w-[70%]">
      <h1>page for Context</h1>

      {!currentUser && (
        <AuthForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}

      {currentUser && <TodoList />}
    </div>
  );
};

export default InnerContextPage;
