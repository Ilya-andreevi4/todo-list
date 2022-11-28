import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../models/IUser";
import { auth } from "../../firebase";

export const TodosContext = createContext({} as any);

export function TodosContextProvider({ children }: any) {
  const [todos, setTodos] = useState<any>(null);

  const logOut = async () => {
    return await signOut(auth).catch((e) =>
      console.error("error with log out" + e)
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTodos(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const values = useMemo(
    () => ({
      logOut,
      todos,
    }),
    [todos]
  );

  return (
    <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
  );
}

export function useTodosContext() {
  return useContext(TodosContext);
}
