/*  2024-06-03 11:11:02

https://codesandbox.io/p/github/KangWoosung/zustand-and-usecontext/draft/stoic-architecture

IonicTodoProvider
*/

"use client";
import {
  IonicTodoProvider,
  useIonicContext,
} from "@/app/contexts/context/useIonicContext";
import AuthForm from "@/app/features/AuthForm";
import TodoList from "@/app/features/TodoList";
import React from "react";
import InnerContextPage from "./InnerContextPage";

const OuterContextPage = () => {
  return (
    <>
      <IonicTodoProvider>
        <InnerContextPage />
      </IonicTodoProvider>
    </>
  );
};

export default OuterContextPage;
