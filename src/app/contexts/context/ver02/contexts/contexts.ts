import { InitialStateType } from "@/app/contexts/types/InitialStateType";
import { createContext } from "react";
import { ReducerAction } from "../../action/ionicReducerAction";

export const IonicStateContext = createContext<InitialStateType | undefined>(
  undefined
);
export const IonicDispatchContext = createContext<
  React.Dispatch<ReducerAction> | undefined
>(undefined);
