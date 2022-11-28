import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../models/IUser";
import { auth } from "../../firebase";

export const appContext = createContext({} as any);

export function AppContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  const logOut = async () => {
    return await signOut(auth).catch((e) =>
      console.error("error with log out" + e)
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const values = useMemo(
    () => ({
      logOut,
      user,
    }),
    [user]
  );

  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}

export function useAppContext() {
  return useContext(appContext);
}
