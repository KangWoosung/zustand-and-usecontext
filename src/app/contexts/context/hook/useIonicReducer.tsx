/*  2024-06-05 12:26:45


*/

"use client";
import { useReducer } from "react";
import { ionicReducer } from "../reducer/ionicReducer";
import { initialState } from "../useIonicContext";
import { REDUCER_ACTION_TYPE } from "../action/ionicReducerAction";
import { TodoType } from "../../types/TodoType";

export const useIonicReducer = () => {
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
