import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppContext } from "../../services/providers/AuthProvider";
import { db } from "../../firebase";
import Todo from "./Todo";

export default function Todos() {
  const { user } = useAppContext();
  const [todos, setTodos] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users/" + (user ? user.uid : "test"), "todos"),
      (doc) => {
        const userDoc = doc.docs;
        const userTodos = userDoc && userDoc;
        setTodos(userTodos);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <>
      <ul className="todo-list">
        {todos &&
          todos.map((t: any, idx: number) => (
            <li key={idx} className="todo-list__todo">
              <Todo todo={t} />
            </li>
          ))}
      </ul>
    </>
  );
}
