import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useUserAuth } from "services/providers/AuthProvider";
import { getAllTodos } from "services/todo-services";
// import ITodo from "../../models/ITodo";

export default function Todo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState<any>([
    {
      title: "#1 Todo",
      discription:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, velit. Vel sit id aliquam impedit voluptates! Accusamus porro quibusdam magni nesciunt maxime, est laboriosam enim ea dolorem numquam",
      complieteDate: JSON.stringify(dayjs(new Date())),
      files: "",
    },
    {
      title: "#2 Todo",
      discription: "string2",
      complieteDate: JSON.stringify(dayjs(new Date())),
      files: "",
    },
    {
      title: "#3 Todo",
      discription: "string3",
      complieteDate: JSON.stringify(dayjs(new Date())),
      files: "",
    },
  ]);
  const getTodos = async () => {
    try {
      const todos: any = await getAllTodos();
      if (todos.docs) {
        setTodos(
          todos.docs.map((doc: any) => ({ ...doc.data(), id: doc.id } as any))
        );
      } else {
        return;
      }
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, [user]);

  return (
    <>
      <ul className="todo-list">
        {todos &&
          todos.map((t: any, idx: number) => (
            <li key={idx} className="todo-list__todo">
              <div className="todo-list__data-container">
                <h1 className="todo-list__title ">{t.title}</h1>
                <p className="todo-list__discription">{t.description}</p>
                <p className="todo-list__date">{t.complieteDate}</p>
                <img src={t.files} alt={t.files} className="todo-list__files" />
              </div>
              <div className="todo-list__button-container">
                <button className="todo-list__button buttons"></button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
