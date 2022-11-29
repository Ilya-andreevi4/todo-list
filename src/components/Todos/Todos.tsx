import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Todo from "./Todo";
import { useAuthContext } from "services/providers/AuthProvider";

export default function Todos() {
  const [todos, setTodos] = useState<any>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    //Подписываемся на изменения в базе задач
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
            <li key={idx}>
              <Todo todo={t} />
            </li>
          ))}
      </ul>
    </>
  );
}
