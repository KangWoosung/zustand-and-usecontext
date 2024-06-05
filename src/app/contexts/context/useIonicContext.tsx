/*  2024-06-05 08:19:58

1. 전역 State 의 타입 선언
1-1. 초기 상태 선언
2. Reducer.Action_Types
3. Reducer function
4. useReducer Custom hook function
5. create createContext
6. Context.Provider Component
7. Context.Consumer Custom Hook

2024-06-05 10:32:21
Job finished. 
https://www.notion.so/gunymedian/React-Project-zustand-useContext-59d48408873b4489a59a10781ef37db6?pvs=4#050412432a36400fa60b2c39bf6cac8f

2024-06-05 10:33:35
selective subscription 문제... 
zustand 의 선택적 구독 방식에 비교해, useContext 의 뭉터기 구독 방식은 효율이 떨어질 수 밖에 없다. 
이 문제를 해결하려면,
a. State Contexts : context 분할
   1.dispatch 펑션 류,
   2.currentUser
   3.todos
   이렇게 종류별로 Context 를 분할해서 관리한다.

문제는,
  return (
    <TodosStateContext.Provider value={state.todos}>
      <CurrentUserStateContext.Provider value={state.currentUser}>
        <AuthCheckedStateContext.Provider value={state.authChecked}>
          <DispatchContext.Provider value={dispatch}>
            {children}
          </DispatchContext.Provider>
        </AuthCheckedStateContext.Provider>
      </CurrentUserStateContext.Provider>
    </TodosStateContext.Provider>
  );
이렇게 컨텍스트가 볼품없이 지저분해진다는 것...
중첩 구조의 Context 를 사용하던지, Zustand, Recoil, Redux 를 사용하던지.. 
다른 방법이 없는 것 같다. 

20중첩을 남발할 수는 없고, 
적당한 선에서 3중첩 정도로 타협하고 외면하는 게 최선일 것 같다. 
    CurrentUserStateContext.Provider, 
        DispatchContext.Provider
            TodosStateContext.Provider, 
이렇게 3 중첩으로 결정하고 외면하자. 
끗  -2024-06-05 10:48:14


*/
"use client";
import {
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/app/utils/todosIO";
import { ReactNode, createContext, useContext } from "react";
import { TodoType } from "../types/TodoType";
import { useIonicReducer } from "./hook/useIonicReducer";

// 1. 전역 State 의 타입 선언
export type InitialStateType = {
  currentUser: string | null;
  authChecked: boolean;
  todos: TodoType[];
  checkAuth: (check: boolean) => boolean;
  setCurrentUser: (user: string) => void;
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedFields: Partial<TodoType>) => void;
  loadTodos: () => TodoType[];
};

// 1-1. 초기 상태 선언
export const initialState: InitialStateType = {
  currentUser: null,
  authChecked: false,
  todos: [],
  checkAuth: (check: boolean) => false, // 초기 값은 임의로 설정
  setCurrentUser: (user: string) => {},
  addTodo: (todo: TodoType) => {},
  deleteTodo: (id: string) => {},
  updateTodo: (id: string, updatedFields: Partial<TodoType>) => {},
  loadTodos: () => [],
};

// 2. Reducer.Action_Types
//  ./action/ionicReducerAction.ts 에서 가져옴

// 3. Reducer function
//  ./reducer/ionicReducer.ts 에서 가져옴

// 4. useReducer Custom hook function
//  ./hook/useIonicReducer.ts 에서 가져옴

// 5. create createContext
export const IonicContext = createContext<
  ReturnType<typeof useIonicReducer> | undefined
>(undefined);

// 6. Context.Provider Component
export const IonicTodoProvider = ({ children }: { children: ReactNode }) => {
  const ionicContextValue = useIonicReducer();
  return (
    <IonicContext.Provider value={ionicContextValue}>
      {children}
    </IonicContext.Provider>
  );
};

// 7. Context.Consumer Custom Hook
export const useIonicContext = () => {
  const context = useContext(IonicContext);
  if (context === undefined) {
    throw new Error("useIonicContext must be used within a IonicTodoProvider");
  }
  return context;
};
