import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useAppContext } from "../../services/providers/AuthProvider";
import { db } from "../../firebase";

export default function Todo(todo: any) {
  const { user } = useAppContext();
  const todoId = todo.todo._document.key.path.segments[8];

  const currentTodo = todo.todo.data();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>(null);
  const [date, setDate] = useState("");
  const [isCompliete, setIsCompliete] = useState(false);
  const [isChangeButton, setIsChangeButton] = useState(false);

  const handleChange = async () => {
    const checkDate = () => {
      const currentDate = dayjs(new Date()).format("YYYY_MM_DDThh:mm:ss");
      if (date < currentDate) {
        setIsCompliete(true);
      }
    };
    checkDate();
    const newTodo = {
      title,
      description,
      createDate: currentTodo.createDate,
      complieteDate: date,
      files: file,
      isCompliete: isCompliete,
    };
    const docRef = doc(db, "users/" + user.uid + "/todos", todoId);
    await updateDoc(docRef, newTodo)
      .then(() => console.log("todo успешно изменена!"))
      .catch((e) => console.error(e.message));
  };

  const handleDelete = async () => {
    const docRef = doc(db, "users/" + user.uid + "/todos", todoId);
    await deleteDoc(docRef)
      .then(() => console.log("todo успешно удален!"))
      .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    setTitle(currentTodo.title);
    setDescription(currentTodo.description);
    setFile(currentTodo.files);
    setDate(currentTodo.complieteDate);
    setIsCompliete(currentTodo.isCompliete);
  }, []);
  useEffect(() => {
    if (
      title === currentTodo.title &&
      description === currentTodo.description &&
      file === currentTodo.files &&
      date === currentTodo.complieteDate &&
      isCompliete === currentTodo.isCompliete
    ) {
      setIsChangeButton(false);
      return;
    } else {
      setIsChangeButton(true);
    }
  }, [title, description, file, date, currentTodo]);
  return (
    <>
      <input
        type="text"
        className={
          "todo-list__title " + (isCompliete && "todo-list__title__complieted")
        }
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <input
        type="text"
        className={
          "todo-list__description " +
          (isCompliete && "todo-list__description__complieted")
        }
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <input
        type="datetime-local"
        className="todo-list__date"
        min={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
        onChange={(e) => setDate(e.target.value)}
        value={date}
      ></input>
      {todo.files && (
        <>
          <input
            type="file"
            id={todo.id}
            className="todo-list__file-input input"
            aria-label="Файл"
            onChange={(e) => {
              e.target.files && setFile(e.target.files[0]);
            }}
          />
          <label htmlFor={todo.id} className="todo-list__label">
            <img src={file} alt={file} className="todo-list__files" />
          </label>
        </>
      )}
      <div className="todo-list__button-container">
        <button
          className="todo-list__delete-button buttons"
          onClick={() => handleDelete()}
        ></button>
        <button
          className="todo-list__button buttons"
          onClick={() => setIsCompliete(!isCompliete)}
        ></button>

        <button
          className={
            isChangeButton ? "todo-list__change-button buttons" : "display-none"
          }
          onClick={() => handleChange()}
        ></button>
      </div>
    </>
  );
}
