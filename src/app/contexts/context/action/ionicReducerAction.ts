/*  2024-06-05 12:23:12


*/

"use client";
import { TodoType } from "../../types/TodoType";

export const enum REDUCER_ACTION_TYPE {
  AUTH_CHECKED = "AUTH_CHECKED",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  LOAD_TODOS = "LOAD_TODOS",
}

export type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.AUTH_CHECKED; check: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_CURRENT_USER; user: string }
  | { type: REDUCER_ACTION_TYPE.ADD_TODO; todo: TodoType }
  | { type: REDUCER_ACTION_TYPE.DELETE_TODO; id: string }
  | {
      type: REDUCER_ACTION_TYPE.UPDATE_TODO;
      id: string;
      updatedFields: Partial<TodoType>;
    }
  | { type: REDUCER_ACTION_TYPE.LOAD_TODOS };
