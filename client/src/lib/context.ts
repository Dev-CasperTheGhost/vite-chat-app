import * as React from "react";
import { Message } from "../interfaces/Message";

interface ContextType {
  username: string | null;

  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Context = React.createContext<ContextType>({ username: null, setUsername: () => null });
export const useContext = () => React.useContext(Context);
