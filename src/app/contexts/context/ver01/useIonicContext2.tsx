/*  2024-06-06 10:27:41


*/

import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  useMemo,
} from "react";

// 1. 전역 State 의 타입 선언
type TodoType = {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date | undefined;
};

type InitialStateType = {
  currentUser: string | null;
  authChecked: boolean;
  todos: TodoType[];
};

const initialState: InitialStateType = {
  currentUser: null,
  authChecked: false,
  todos: [],
};

// 2. Reducer.Action_Types
export const enum REDUCER_ACTION_TYPE {
  AUTH_CHECKED = "AUTH_CHECKED",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  LOAD_TODOS = "LOAD_TODOS",
}

type ReducerAction =
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

// 3. Reducer function
const ionicReducer = (
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
    case REDUCER_ACTION_TYPE.UPDATE_TODO: {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.id
          ? { ...todo, ...action.updatedFields, updatedAt: new Date() }
          : todo
      );
      saveTodosToLocalStorage(updatedTodos);
      return { ...state, todos: updatedTodos };
    }
    case REDUCER_ACTION_TYPE.LOAD_TODOS: {
      const todos = loadTodosFromLocalStorage();
      return { ...state, todos };
    }
    default:
      return state;
  }
};

// 4. State Contexts and Dispatch Context
const StateContext = createContext<InitialStateType | undefined>(undefined);
const DispatchContext = createContext<Dispatch<ReducerAction> | undefined>(
  undefined
);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};

export const useDispatchContext = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      "useDispatchContext must be used within a DispatchProvider"
    );
  }
  return context;
};

// 5. Context.Provider Component
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ionicReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// 6. Custom Hooks for specific state and dispatch functions
export const useTodos = () => {
  const { todos } = useStateContext();
  const dispatch = useDispatchContext();

  const addTodo = (todo: TodoType) =>
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_TODO, todo });
  const deleteTodo = (id: string) =>
    dispatch({ type: REDUCER_ACTION_TYPE.DELETE_TODO, id });
  const updateTodo = (id: string, updatedFields: Partial<TodoType>) =>
    dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_TODO, id, updatedFields });
  const loadTodos = () => dispatch({ type: REDUCER_ACTION_TYPE.LOAD_TODOS });

  return { todos, addTodo, deleteTodo, updateTodo, loadTodos };
};

export const useCurrentUser = () => {
  const { currentUser } = useStateContext();
  const dispatch = useDispatchContext();

  const setCurrentUser = (user: string) =>
    dispatch({ type: REDUCER_ACTION_TYPE.SET_CURRENT_USER, user });

  return { currentUser, setCurrentUser };
};

export const useAuthChecked = () => {
  const { authChecked } = useStateContext();
  const dispatch = useDispatchContext();

  const checkAuth = (check: boolean) =>
    dispatch({ type: REDUCER_ACTION_TYPE.AUTH_CHECKED, check });

  return { authChecked, checkAuth };
};

// 7. Helper functions for localStorage
const saveTodosToLocalStorage = (todos: TodoType[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodosFromLocalStorage = (): TodoType[] => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};
