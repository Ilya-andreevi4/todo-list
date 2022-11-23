import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../models/IUser";
import { auth, db } from "../../firebase";

const userAuthContext = createContext({} as any);

export function UserAuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  const signUp = async (email: any, password: any) => {
    return (
      await createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          const usersCollectionRef = collection(db, "users/");
          const newUser = {
            uid: "",
            timestamp: Date.now(),
            email: email,
          };
          return addDoc(usersCollectionRef, newUser)
            .then((d) => {
              return setDoc(
                doc(db, "users/", d.id),
                { uid: d.id },
                { merge: true }
              );
            })
            .catch((e) => {
              console.error(e.message);
            });
        })
        .catch((e) => {
          console.error(e.message);
        }),
      auth.currentUser &&
        updateProfile(auth.currentUser, {
          displayName: user?.email,
        })
          .then(() => {
            console.log("Profile update!");
          })
          .catch((e) => {
            console.error(e.message);
          })
    );
  };
  function logIn(email: any, password: any) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

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
      signUp,
      logIn,
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
