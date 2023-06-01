import { createContext, useState } from "react";

export const UserCtx = createContext();

export function UserCtxProvider(props) {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));

  return (
    <UserCtx.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </UserCtx.Provider>
  );
}
