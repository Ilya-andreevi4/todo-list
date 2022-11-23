import dayjs from "dayjs";
import { useState, useEffect } from "react";
import ITodo from "../../models/ITodo";

export default function Todo() {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      title: "#1 Todo",
      discription: "string",
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

  useEffect(() => {
    setTodos([
      ...todos,
      {
        title: "Another one Todo",
        discription: "another one string",
        complieteDate: JSON.stringify(dayjs(new Date())),
        files: "",
      },
    ]);
  }, []);

  return (
    <>
      <ul className="todo-list">
        {todos &&
          todos.map((t, idx) => (
            <li key={idx} className="todo-list__todo">
              <h1 className=".todo-list__title">{t.title}</h1>
              <p className=".todo-list__discription">{t.discription}</p>
              <p className=".todo-list__date">{t.complieteDate}</p>
              <img src={t.files} alt={t.files} className=".todo-list__files" />
            </li>
          ))}
      </ul>
    </>
  );
}
