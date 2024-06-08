/*  2024-06-05 12:26:45

2024-06-07 08:01:57
1.
dispatch 펑션이 리턴되면 그 펑션은 state 업데이터 펑션인 것이다. 
dispatch 펑션이 리턴되고 실행되는 것인지 확인해볼 것. 
2.
dispatch 펑션이 업데이트한 state 가 실제 디스플레이에서 참조되고 있는지 확인해야 한다. 


*/

"use client";
import { useReducer } from "react";
import { ionicReducer } from "../../reducer/ionicReducer";
import { initialState } from "../useIonicContext";
import { REDUCER_ACTION_TYPE } from "../../action/ionicReducerAction";
import { TodoType } from "../../../types/TodoType";

export const useIonicReducer2 = () => {
  const [state, dispatch] = useReducer(ionicReducer, initialState);

  return {
    currentUser: state.currentUser,
    authChecked: state.authChecked,
    todos: state.todos,
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
};

export const useIonicReducer = () => {
  return useReducer(ionicReducer, initialState);
};
