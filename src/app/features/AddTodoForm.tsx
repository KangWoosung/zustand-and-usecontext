/*  2024-06-04 08:11:59


*/

import React, { useState } from "react";
import { useTodoStore } from "../contexts/zustand/hooks/useTodoStore";
import { TodoType } from "../contexts/types/TodoType";
import { InputGroup } from "../components/form/InputGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTodoSchemaType, addTodoSchema } from "../schemas/addTodoSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const AddTodoForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 선택적 구독!!!
  const { currentUser, setCurrentUser } = useTodoStore();
  // const loadTodos = useTodoStore((state) => state.loadTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  // const updateTodo = useTodoStore((state) => state.updateTodo);
  // const todos = useTodoStore((state) => state.todos);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTodoSchemaType>({ resolver: zodResolver(addTodoSchema) });

  const addTodoHandler = (data: AddTodoSchemaType) => {
    console.log("Adding Todo");
    const { title, content, isCompleted } = data;
    if (!title) return console.error("title is required");
    if (!content) return console.error("content is required");

    addTodo({
      id: crypto.randomUUID(),
      title,
      content,
      isCompleted: isCompleted || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  // Todos 에 존재하는 todo 의 중복 입력 방지

  return (
    <>
      <h3 className="py-4 px-8 text-lg font-bold">AddTodoForm</h3>
      <form
        className="flex flex-col justify-center items-center gap-12 px-4 py-8 border-2"
        onSubmit={handleSubmit(addTodoHandler)}
      >
        <InputGroup errorMessage={errors.title?.message as string}>
          <input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Todo title"
            className="peer rounded-md  p-2 w-[100%] text-black border-2
            placeholder-transparent
            bg-[color:var(--chat-bubble-background-color)] 
            focus:border-[color:var(--chat-bubble-deep-background-color)]
            z-0"
          />
          <label
            htmlFor="title"
            className="absolute left-2 -top-5 text-gray-300 text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-3
            peer-focus:-top-5
            peer-focus:text-gray-300 peer-focus:text-sm
            "
          >
            Todo title
          </label>
        </InputGroup>

        <InputGroup errorMessage={errors.content?.message as string}>
          <input
            {...register("content")}
            id="content"
            type="text"
            placeholder="Todo content"
            className="peer rounded-md  p-2 w-[100%] text-black border-2
            placeholder-transparent
            bg-[color:var(--chat-bubble-background-color)] 
            focus:border-[color:var(--chat-bubble-deep-background-color)]
            z-0"
          />
          <label
            htmlFor="content"
            className="absolute left-2 -top-5 text-gray-300 text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-3
            peer-focus:-top-5
            peer-focus:text-gray-300 peer-focus:text-sm
            "
          >
            Todo content
          </label>
        </InputGroup>

        <div className="flex flex-row w-[100%] space-x-2 p-4 border-2 rounded-lg">
          <Checkbox id="isCompleted" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="isCompleted"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              This Job is Completed
            </label>
            <p className="text-sm text-muted-foreground">
              job completed? check this box
            </p>
          </div>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className={`w-[100%] rounded-md py-4 px-5 my-8
          text-black border-2
          bg-[color:var(--positive-background-color)]
          hover:bg-[color:var(--positive-deep-background-color)]
          disabled:bg-[color:var(--input-background-disabled-color)]
          disabled:cursor-not-allowed
          `}
        >
          {loading ? "Loading" : "Add Action"}
        </Button>
      </form>
    </>
  );
};

export default AddTodoForm;
