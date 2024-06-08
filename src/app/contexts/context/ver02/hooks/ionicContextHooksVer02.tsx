/*  2024-06-07 12:16:43

useIonicStateContext, useIonicDispatchContext 훅을 사용한 최종 커스텀 훅 펑션들... 

*/

import { TodoType } from "@/app/contexts/types/TodoType";
import {
  useIonicDispatchContext,
  useIonicStateContext,
} from "../useIonicContextVer02";
import { REDUCER_ACTION_TYPE } from "../../action/ionicReducerAction";

export const useAddTodo = () => {
  const dispatch = useIonicDispatchContext();
  return (todo: TodoType) =>
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_TODO, todo });
};

export const useDeleteTodo = () => {
  const dispatch = useIonicDispatchContext();
  return (id: string) =>
    dispatch({ type: REDUCER_ACTION_TYPE.DELETE_TODO, id });
};

export const useUpdateTodo = () => {
  const dispatch = useIonicDispatchContext();
  return (id: string, updatedFields: Partial<TodoType>) =>
    dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_TODO, id, updatedFields });
};

export const useLoadTodos = () => {
  const dispatch = useIonicDispatchContext();
  return () => dispatch({ type: REDUCER_ACTION_TYPE.LOAD_TODOS });
};

export const useTodos = () => {
  const state = useIonicStateContext();
  return state.todos;
};

export const useCurrentUser = () => {
  const state = useIonicStateContext();
  return state.currentUser;
};

export const useSetCurrentUser = () => {
  const dispatch = useIonicDispatchContext();
  return (user: string) =>
    dispatch({ type: REDUCER_ACTION_TYPE.SET_CURRENT_USER, user });
};

export const useAuthChecked = () => {
  const state = useIonicStateContext();
  return state.authChecked;
};
// export const useCheckAuth = () => {
//   const dispatch = useIonicDispatchContext();
//   return (check: boolean) =>
//     dispatch({ type: REDUCER_ACTION_TYPE.CHECK_AUTH, check });
// }

// export const useAuthCheck = () => {
//     const dispatch = useIonicDispatchContext();
//     return (check: boolean) =>
//         dispatch({ type: REDUCER_ACTION_TYPE.CHECK_AUTH, check });
//     };
