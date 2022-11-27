import dayjs from "dayjs";
import { useAppContext } from "../../services/providers/AuthProvider";

export default function Todo() {
  const { user, todos } = useAppContext();

  return (
    <>
      <ul className="todo-list">
        {todos &&
          todos.map((t: any, idx: number) => (
            <li key={idx} className="todo-list__todo">
              <h1 className="todo-list__title ">{t.title}</h1>
              <p className="todo-list__discription">{t.description}</p>
              <p className="todo-list__date">
                Дата окончания:
                {dayjs(t.complieteDate).format(" HH:mm DD.MM.YYYY")}
              </p>
              {t.files && (
                <img src={t.files} alt={t.files} className="todo-list__files" />
              )}
              <div className="todo-list__button-container">
                <button className="todo-list__button buttons"></button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
