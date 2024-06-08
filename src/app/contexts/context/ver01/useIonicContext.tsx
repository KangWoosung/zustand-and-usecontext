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


2024-06-07 08:48:47
IonicContextProvider 에서 문제...
  const [state, dispatch] = useReducer(ionicReducer, initialState);
이렇게 초기상태로 dispatch 와 state 를 생성하는데,
이게 무조건 초기화가 되는 상황이라서, 로그인 state 가 유지가 안된다. 
페이지 이동시 useReducer(ionicReducer, initialState) 가 무조건 재발동 된다는 것.. 
이 문제에 대한 해답:
Context 페이지를 벗어났다가 되돌아갔을 때, Zustand 와는 다르게 로그인 세션? 이 유지되지 않는 반응을 보실 수 있습니다. 
useReducer 는 원칙적으로 '상태' 를 관리하는 훅이고, '상태' 는, 컴포넌트가 언마운트/리마운트될 때 기본적으로 초기화 되는 게 정상입니다. 
Context 예제 페이지가 언마운트/리마운트 되는 과정에서 Zustand 처럼 로그인 정보가 유지되게 하려면, 별도의 세션유지 스토리지나 전역 스테이트 처리가 추가로 필요합니다. 
그러나 이 문제는 이 프로젝트가 관심을 두는 영역을 벗어나기 때문에, 여기서는 해결해야 할 문제로 보지 않겠습니다.



*/
"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { TodoType } from "../../types/TodoType";
import { useIonicReducer } from "./hooks/useIonicReducer";
import {
  REDUCER_ACTION_TYPE,
  ReducerAction,
} from "../action/ionicReducerAction";
import { ionicReducer } from "../reducer/ionicReducer";

// 1. 전역 State 의 타입 선언
export type InitialTodoType = {
  todos: TodoType[];
};
export type InitialContextStateType = {
  currentUser: string | null;
  authChecked: boolean;
  todos: TodoType[];
};
export type InitialContextDispatchType = {
  checkAuth: (check: boolean) => void;
  setCurrentUser: (user: string) => void;
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedFields: Partial<TodoType>) => void;
  loadTodos: () => void;
};

export type InitialStateType = InitialContextStateType &
  InitialContextDispatchType;

// 1-1. 초기 상태 선언
// 초기 상태에서 함수들은 실제로 실행되지 않도록 하기 위해 빈 함수로 초기화
export const initialState: InitialStateType = {
  currentUser: null,
  authChecked: false,
  todos: [],
  checkAuth: () => {}, // 초기 값은 임의로 설정
  setCurrentUser: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  loadTodos: () => [],
};

// 2. Reducer.Action_Types
//  ./action/ionicReducerAction.ts 에서 가져옴

// 3. Reducer function
//  ./reducer/ionicReducer.ts 에서 가져옴

// 4. useReducer Custom hook function
//  ./hook/useIonicReducer.ts 에서 가져옴

// const StateContext = createContext<InitialStateType | undefined>(undefined);
// const DispatchContext = createContext<Dispatch<ReducerAction> | undefined>(undefined);
// 5. create createContext
export const IonicStateContext = createContext<
  InitialContextStateType | undefined
>(undefined);
export const IonicDispatchContext = createContext<
  InitialContextDispatchType | undefined
>(undefined);

// 6. Context.Provider Component
// const ionicContextValue = useIonicReducer();
// const [state, dispatch] = useReducer(useIonicReducer, initialState);
//

export const IonicContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ionicReducer, initialState);
  const stateValue = {
    currentUser: state.currentUser,
    authChecked: state.authChecked,
    todos: state.todos,
  };

  const dispatchValue = {
    checkAuth: (check: boolean) =>
      dispatch({ type: REDUCER_ACTION_TYPE.AUTH_CHECKED, check }),
    setCurrentUser: (user: string) =>
      dispatch({ type: REDUCER_ACTION_TYPE.SET_CURRENT_USER, user }),
    addTodo: (todo: TodoType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.ADD_TODO, todo }),
    deleteTodo: (id: string) =>
      dispatch({ type: REDUCER_ACTION_TYPE.DELETE_TODO, id }),
    updateTodo: (id: string, updatedFields: Partial<TodoType>) =>
      dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_TODO, id, updatedFields }),
    loadTodos: () => dispatch({ type: REDUCER_ACTION_TYPE.LOAD_TODOS }),
  };

  return (
    <IonicDispatchContext.Provider value={dispatchValue}>
      <IonicStateContext.Provider value={stateValue}>
        {children}
      </IonicStateContext.Provider>
    </IonicDispatchContext.Provider>
  );
};

/*
export const IonicContextProvider2 = ({ children }: { children: ReactNode }) => {
  const {
    currentUser,
    authChecked,
    todos,
    checkAuth,
    setCurrentUser,
    addTodo,
    deleteTodo,
    updateTodo,
    loadTodos,
  } = useIonicReducer();
  const state = { currentUser, authChecked, todos };
  const dispatch = {
    checkAuth,
    setCurrentUser,
    addTodo,
    deleteTodo,
    updateTodo,
    loadTodos,
  };

  return (
    <IonicDispatchContext.Provider value={dispatch}>
      <IonicStateContext.Provider value={state}>
        {children}
      </IonicStateContext.Provider>
    </IonicDispatchContext.Provider>
  );
};
*/
// 7. Context.Consumer Custom Hook
export const useIonicStateContext = () => {
  const context = useContext(IonicStateContext);
  if (context === undefined) {
    throw new Error(
      "useIonicStateContext must be used within a IonicContextProvider"
    );
  }
  return context;
};

export const useIonicDispatchContext = () => {
  const context = useContext(IonicDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useIonicDispatchContext must be used within a IonicContextProvider"
    );
  }
  return context;
};
