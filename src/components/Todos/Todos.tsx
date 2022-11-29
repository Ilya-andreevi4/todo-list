import { useAuthContext } from "services/providers/AuthProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import React from "react";
import Todo from "./Todo";

export default function Todos() {
  const [todos, setTodos] = useState<any>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const q = query(
      collection(db, "users/" + (user ? user.uid : "test"), "todos"),
      orderBy("createDate")
    );
    //Подписываемся на изменения в базе задач
    const unsubscribe = onSnapshot(q, (doc) => {
      const userDoc = doc.docs;
      const userTodos = userDoc && userDoc;
      setTodos(userTodos);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return (
    <>
      <ul className="todo-list">
        {todos &&
          todos.map((t: any, idx: number) => (
            <li key={idx}>
              <Todo todo={t} />
            </li>
          ))}
      </ul>
    </>
  );
}
