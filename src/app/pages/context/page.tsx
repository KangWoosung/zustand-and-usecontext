/*  2024-06-03 11:11:02


*/

"use client";
// import { IonicContextProvider } from "@/app/contexts/context/ver01/useIonicContext";
import { IonicContextProvider } from "@/app/contexts/context/ver02/useIonicContextVer02";
import React from "react";
import InnerContextPage from "./InnerContextPage";

const OuterContextPage = () => {
  return (
    <>
      <IonicContextProvider>
        <InnerContextPage />
      </IonicContextProvider>
    </>
  );
};

export default OuterContextPage;
