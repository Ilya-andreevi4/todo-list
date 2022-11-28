import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppContext } from "../../services/providers/AuthProvider";
import { db } from "../../firebase";
import Todo from "./Todo";
import dayjs from "dayjs";

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
        {/* {todos &&
          todos.map((t: any, idx: number) => (
            <li key={idx} className="todo-list__todo">
              <h1 className="todo-list__title ">{t.title}</h1>
              <p className="todo-list__discription">{t.description}</p>

              {t.complieteDate ? (
                <p className="todo-list__date">
                  Дата окончания:
                  {dayjs(t.complieteDate).format(" HH:mm DD.MM.YYYY")}
                </p>
              ) : (
                <p className="todo-list__date">Указать дату окончания</p>
              )}
              {t.files && (
                <img src={t.files} alt={t.files} className="todo-list__files" />
              )}
              <div className="todo-list__button-container">
                <button className="todo-list__button buttons"></button>
              </div>
            </li>
          ))} */}
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
