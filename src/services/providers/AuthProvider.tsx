import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../models/IUser";
import { auth } from "../../firebase";

export const AuthContext = createContext({} as any);

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  const logOut = async () => {
    return await signOut(auth).catch((e) =>
      console.error("error with log out" + e)
    );
  };

  useEffect(() => {
    //Подписываемся на изменение авторизации
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

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
