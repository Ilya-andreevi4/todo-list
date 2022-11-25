import dayjs from "dayjs";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ITodo from "models/ITodo";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../services/providers/AuthProvider";

export default function Todo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState<any>([
    {
      title: "#1 Todo",
      discription:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, velit. Vel sit id aliquam impedit voluptates! Accusamus porro quibusdam magni nesciunt maxime, est laboriosam enim ea dolorem numquam",
      complieteDate: dayjs(new Date()).format("DD.MM.YYYYTHH:mm:ss"),
      files: "",
      isCompliete: false,
    },
    {
      title: "#2 Todo",
      discription: "string2",
      complieteDate: dayjs(new Date()).format("DD.MM.YYYYTHH:mm:ss"),
      files: "",
      isCompliete: true,
    },
    {
      title: "#3 Todo",
      discription: "string3",
      complieteDate: dayjs(new Date()).format("DD.MM.YYYYTHH:mm:ss"),
      files: "",
      isCompliete: true,
    },
  ]);
  const getTodos = async () => {
    try {
      const todosCollectionRef = collection(
        db,
        `users/` + user?.uid + `/todos`
      );
      const todos = await getDocs(todosCollectionRef).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });

      if (todos) {
        setTodos(
          todos.docs
            .map((doc: any) => ({ ...doc.data(), id: doc.id } as any))
            .sort((a: ITodo, b: ITodo) =>
              a.createDate > b.createDate ? 1 : -1
            )
        );
      } else {
        console.log("Не получилось загрузить задачи...");
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
              {/* <div className="todo-list__data-container"> */}
              <h1 className="todo-list__title ">{t.title}</h1>
              <p className="todo-list__discription">{t.description}</p>
              <p className="todo-list__date">
                Дата окончания:
                {dayjs(t.complieteDate).format(" HH:mm DD.MM.YYYY")}
              </p>
              {t.files && (
                <img src={t.files} alt={t.files} className="todo-list__files" />
              )}
              {/* </div> */}
              <div className="todo-list__button-container">
                <button className="todo-list__button buttons"></button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
