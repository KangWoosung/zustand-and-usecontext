/*  2024-06-03 07:09:41

7900 5870 775 054

*/
"use client";
import React, { useState } from "react";
import { useTodoStore } from "@/app/contexts/zustand/hooks/useTodoStore";
import { InitialStateType } from "@/app/contexts/types/InitialStateType";

const ZustandPage = () => {
  const { checkAuth, setUser } = useTodoStore();
  const [username, setUsername] = useState<string>("");

  const handleAuth = () => {
    console.log("Authenticating User");
    // checkAuth();
    setUser(username);
  };
  return (
    <>
      <h1>page for zustand</h1>

      <h2>Auth User</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button
        className="btn btn-primary py-4 px-8 border-2 rounded-lg border-b-yellow-600"
        onClick={handleAuth}
      >
        Auth User
      </button>
    </>
  );
};

export default ZustandPage;
