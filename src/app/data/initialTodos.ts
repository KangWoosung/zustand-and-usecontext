/*  2024-06-03 12:36:24


*/

import { TodoType } from "../contexts/types/TodoType";
// import { initialState } from "./initialState";

export const dummyTodos: TodoType[] = [
  {
    id: crypto.randomUUID(),
    title: "Buy groceries",
    content: "Milk, Bread, Cheese, Eggs, Butter",
    isCompleted: false,
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    title: "Read a book",
    content: "Finish reading 'The Great Gatsby'",
    isCompleted: false,
    createdAt: new Date("2024-01-02T11:00:00Z"),
    updatedAt: new Date("2024-01-02T11:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    title: "Workout",
    content: "Go to the gym for 1 hour",
    isCompleted: true,
    createdAt: new Date("2024-01-03T12:00:00Z"),
    updatedAt: new Date("2024-01-03T13:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    title: "Clean the house",
    content: "Vacuum and dust all rooms",
    isCompleted: false,
    createdAt: new Date("2024-01-04T09:00:00Z"),
    updatedAt: new Date("2024-01-04T09:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    title: "Call mom",
    content: "Check in and see how she's doing",
    isCompleted: false,
    createdAt: new Date("2024-01-05T08:00:00Z"),
    updatedAt: new Date("2024-01-05T08:00:00Z"),
  },
];
