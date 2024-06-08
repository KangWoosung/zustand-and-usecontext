/*  2024-06-05 01:59:44


*/

import React, { useRef } from "react";
import { useTodoStore } from "../../contexts/zustand/hooks/useTodoStore";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TodoType } from "../../contexts/types/TodoType";
import { IoCloudDoneOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";

type ToDoProps = {
  todo: TodoType;
  index: number;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedFields: Partial<TodoType>) => void;
};

const Todo = ({ todo, index, deleteTodo, updateTodo }: ToDoProps) => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleToggle = (index: number) => {
    const contentElement = contentRefs.current[index];
    if (contentElement) {
      if (contentElement.style.display === "block") {
        contentElement.style.display = "none";
      } else {
        contentElement.style.display = "block";
      }
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting Todo : ", id);
    deleteTodo(id);
  };

  const checkboxHandler = async (id: string, checked: boolean) => {
    console.log("Checkbox Handler", id, checked);
    updateTodo(id, { isCompleted: checked });
  };

  return (
    <>
      <div key={todo.id} className="flex flex-col my-2 border-2 rounded-lg">
        <div
          className="flex flex-row justify-between p-4"
          onClick={() => handleToggle(index)}
        >
          <div className="flex fles-row">
            <IoCloudDoneOutline
              className="mx-4"
              size={24}
              color={todo.isCompleted ? "gray" : "red"}
            />
            {todo.title}
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-sm font-light mx-2">
              {todo?.createdAt?.toString()}
            </div>
            <div></div>
            <div
              className="mx-2 cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              <RiDeleteBin5Line size={20} font-weight={100} />
            </div>
          </div>
        </div>
        <div
          ref={(el) => {
            contentRefs.current[index] = el;
          }}
          style={{ display: "none" }}
          className="flex flex-row justify-left p-4 bg-slate-100"
        >
          <div className="flex flex-col w-20 center p-2">
            <Checkbox
              id="isCompleted"
              className="mx-auto"
              checked={todo.isCompleted}
              onCheckedChange={(checked: boolean) =>
                checkboxHandler(todo.id, checked)
              }
            />
            <span className="mx-auto text-xs font-light">
              Check to Complete
            </span>
          </div>
          <div className="flex flex-col justify-left max-w-80 p-2 ">
            <div>{todo.content}</div>
            <div className="text-xs font-light">
              {todo?.createdAt?.toString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
