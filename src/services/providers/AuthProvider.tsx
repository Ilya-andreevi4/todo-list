import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../models/IUser";
import { auth } from "../../firebase";

const userAuthContext = createContext({} as any);

export function UserAuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  const logOut = async () => {
    return await signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
      })
      .catch((e) => console.error("error with log out" + e));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  return (
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
