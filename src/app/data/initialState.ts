/*  2024-06-03 12:00:45


*/

// 2. Initial state .. 프로젝트 전역 State 객체의 초기값을 결정합니다.
export const initialState = {
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
