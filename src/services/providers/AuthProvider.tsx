import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../models/IUser";
import { auth, db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const appContext = createContext({} as any);

export function AppContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const [todos, setTodos] = useState<any>(null);

  const logOut = async () => {
    return await signOut(auth).catch((e) =>
      console.error("error with log out" + e)
    );
  };

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      onSnapshot(
        collection(db, "users/" + (user ? user.uid : "test"), "todos"),
        (doc) => {
          const userDoc = doc.docs;

          const userTodos = userDoc && userDoc.map((d) => d.data());

          setTodos(userTodos);
        }
      );
    };
    return () => {
      unsubscribe();
    };
  }, []);

  const values = useMemo(
    () => ({
      logOut,
      user,
      todos,
    }),
    [user, todos]
  );

  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}

export function useAppContext() {
  return useContext(appContext);
}
