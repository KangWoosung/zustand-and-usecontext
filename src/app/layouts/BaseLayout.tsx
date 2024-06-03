/*  2024-06-03 10:24:32


*/

import Link from "next/link";
import React, { JSXElementConstructor, ReactElement } from "react";
import Footer from "./Footer";

const BaseLayout = ({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  return (
    <>
      <div className="wrapper flex flex-col mt-0 h-svh">
        <ul className="flex flex-row justify-center border-solid rounded-lg bg-slate-500 text-gray-100">
          <li className=" py-4 px-8">
            <Link href={"/"}>Home</Link>
          </li>
          <li className=" py-4 px-8">
            <Link href={"/zustand"}>Zustand</Link>
          </li>
          <li className=" py-4 px-8">
            <Link href={"/context"}>Context</Link>
          </li>
        </ul>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
