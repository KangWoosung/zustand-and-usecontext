/*  2024-06-05 12:21:47


*/

import {
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/app/utils/todosIO";
import {
  REDUCER_ACTION_TYPE,
  ReducerAction,
} from "../action/ionicReducerAction";
import { InitialStateType } from "../ver01/useIonicContext";

export const ionicReducer = (
  state: InitialStateType,
  action: ReducerAction
): InitialStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.AUTH_CHECKED:
      return { ...state, authChecked: action.check };
    case REDUCER_ACTION_TYPE.SET_CURRENT_USER:
      return { ...state, currentUser: action.user };
    case REDUCER_ACTION_TYPE.ADD_TODO: {
      const updatedTodos = [...state.todos, action.todo];
      saveTodosToLocalStorage(updatedTodos);
      return { ...state, todos: updatedTodos };
    }
    case REDUCER_ACTION_TYPE.DELETE_TODO: {
      const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);
      saveTodosToLocalStorage(updatedTodos);
      return { ...state, todos: updatedTodos };
    }
    case REDUCER_ACTION_TYPE.UPDATE_TODO:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.id
          ? { ...todo, ...action.updatedFields, updatedAt: new Date() }
          : todo
      );
      saveTodosToLocalStorage(updatedTodos);
      return { ...state, todos: updatedTodos };
    case REDUCER_ACTION_TYPE.LOAD_TODOS:
      const todos = loadTodosFromLocalStorage();
      console.log("loaded todos");
      console.log(todos);
      return { ...state, todos };
    default:
      return state;
  }
};
