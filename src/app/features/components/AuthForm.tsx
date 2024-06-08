/*  2024-06-04 07:06:21

2024-06-06 06:35:54
주요 prop 을 사전처리해서 prop 으로 받았기 때문에, 이 코드는 zustand 와 context 공통으로 사용될 수 있었다. 
손 볼 일 없음. 끗

*/

"use client";
import React, { useState } from "react";
import { InputGroup } from "../../components/form/InputGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchemaType, authSchema } from "../../schemas/authSchema";
import { useForm } from "react-hook-form";
import { useTodoStore } from "../../contexts/zustand/hooks/useTodoStore";

type AuthFormProps = {
  currentUser: string | null;
  setCurrentUser: (user: string) => void;
  checkAuth?: (auth: boolean) => void;
};

const AuthForm = ({
  currentUser,
  checkAuth,
  setCurrentUser,
}: AuthFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema) });

  const handleLogin = async (data: AuthSchemaType) => {
    console.log("Authenticating User");
    setLoading(true);
    const { userName } = data;

    if (!userName) return console.error("userName is required");

    try {
      await makeTimeout(1000);
      // checkAuth(true);
      setCurrentUser(userName);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto justify-center w-2/3 p-6">
      <h2>Auth User</h2>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col justify-center items-center gap-12"
      >
        <InputGroup errorMessage={errors.userName?.message as string}>
          <input
            {...register("userName")}
            id="userName"
            type="text"
            placeholder="userName"
            className="peer rounded-md border-2 outline-0 mt-4 p-2 w-[100%] font-light text-slate-300 
            placeholder-transparent
            border-[color:var(--chat-bubble-deep-background-color)]
            bg-[color:var(--chat-bubble-background-color)] 
            border-transparent
            focus:border-[color:var(--chat-bubble-deep-background-color)]
            z-0"
          />
          <label
            htmlFor="userName"
            className="absolute left-2 -top-8 mt-4 text-gray-300 text-sm
            transition-all
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:top-3
            peer-focus:-top-5
            peer-focus:text-gray-300 peer-focus:text-sm
            "
          >
            userName
          </label>
        </InputGroup>

        <button
          disabled={loading}
          type="submit"
          className={`w-[100%] rounded-md py-4 px-5 my-8
          bg-[color:var(--positive-background-color)]
          hover:bg-[color:var(--positive-deep-background-color)]
          disabled:bg-[color:var(--input-background-disabled-color)]
          disabled:cursor-not-allowed
          `}
        >
          {loading ? "Loading" : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

async function makeTimeout(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  });
}
