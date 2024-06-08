/*  2024-06-07 12:00:33

================================================================
이 버전에서는 useIonicReducer 커스텀 훅이 사용되지 않고 생략된다. 
dispatch 를 사용하는 훅이 생략되어야 하므로, dispatch 펑션 자체가 Context 에서 제공되어야만 한다. 
    : <IonicDispatchContext.Provider value={dispatch}>
Context.Consumer 의 커스텀 훅도, dispatch 를 직접 사용한 펑션코드를 리턴한다.

    export const useAddTodo = () => {
        const dispatch = useIonicDispatchContext();
        return (todo: TodoType) =>
            dispatch({ type: REDUCER_ACTION_TYPE.ADD_TODO, todo });
    };

================================================================
이렇게 처리해야만 하는 이유에 대해... 
*. 선택적 구독.. 
    Context 자체로는 선택적 구독에 제약이 있다. 때문에 각각의 개별 펑션들이 최대한 늦취진 시점에서 생성되고 제공되어야 할 필요가 있다.
    이 때문에 dispatch 가 전역 컨텍스트로 준비되어 있어야만 한다. 따라서, useCustomReducer 커스텀 펑션이 사용될 공간이 사라진다. 

================================================================
버전 Shift : No shift available.
ver01 은 폐기 되었다.

================================================================

이전 ver01 에서의 처리 순서..
1. InitialStateType
2. InitialState
3. Reducer.Action_Types
4. Reducer function
5. useReducer Custom hook function
6. create createContext
7. Context.Provider Component
8. Context.Consumer Custom Hook

이번 ver02 버전의 처리 순서.. 
    5. useReducer Custom hook function 가 생략되고, dispatch 가 useContext Hook 에서 리턴된다.
1. InitialStateType
2. InitialState
3. reducer.Action_Types
4. Reducer.function
5. create CreateContext
6. Context.Provider
7. useContext Hook .... 
   이번 버전에서 가장 큰 변화인데,
   state 와 dispatch 를 리턴하는 커스텀 훅이다. 
   이 훅들이 최종적으로 컨텍스트의 상태와 디스패치를 리턴한다.
   리턴 받은 디스패치로 상태 업데이트 개별 훅 펑션들이 생성 & 리턴되어 컴포넌트 단에서 사용될 것이다.


최종 개별 훅의 형태:  
    dispatch 액션 펑션을 리턴한다. 
export const useAddTodo = () => {
  const dispatch = useIonicDispatchContext();
  return (todo: TodoType) =>
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_TODO, todo });
};

*/

import { ReactNode, createContext, useContext, useReducer } from "react";
import { ionicReducer } from "../reducer/ionicReducer";
import { IonicDispatchContext, IonicStateContext } from "./contexts/contexts";
import { initialState } from "@/app/data/initialState";

// 1. 전역 State 의 타입 선언

// 2. InitialState

// 3. reducer.Action_Types

// 4. Reducer.function

// 5. create CreateContext

// 6. Context.Provider
export const IonicContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ionicReducer, initialState);

  return (
    <IonicDispatchContext.Provider value={dispatch}>
      <IonicStateContext.Provider value={state}>
        {children}
      </IonicStateContext.Provider>
    </IonicDispatchContext.Provider>
  );
};

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

// useIonicStateContext, useIonicDispatchContext 훅을 사용한 최종 커스텀 훅 펑션들...
// 커스텀 훅들을 모두 export
export * from "./hooks/ionicContextHooksVer02";
