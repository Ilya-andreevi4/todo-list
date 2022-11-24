import ITodo from "models/ITodo";
import { useState } from "react";
import { addTodo } from "services/todo-services";
import "./create-form.less";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(JSON.stringify(new Date().toISOString()));
  const [file, setFile] = useState("");
  const handleSubmit = async () => {
    const newTodo: ITodo = {
      title,
      description,
      complieteDate: date,
      files: file,
    };
    await addTodo(newTodo, "test");
  };
  return (
    <form onSubmit={() => handleSubmit()} className="form">
      <h2 className="form__title">Заголовок задачи</h2>
      <input
        type="text"
        className="form__title-input input"
        aria-label="Заголовок задачи"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <h2 className="form__title">Описание задачи</h2>
      <input
        type="text"
        className="form__discription-input input"
        aria-label="Описание задачи"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <h2 className="form__title">Дополнительные файлы</h2>
      <input
        type="file"
        className="form__file"
        aria-label="Дополнительные файлы"
        onChange={(e) => setFile(e.target.value)}
        value={file}
      />
      <input
        type="datetime-local"
        className="form__date"
        name="compliete-task-time"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      ></input>
      <input
        className="form__button buttons"
        type="submit"
        value="СОЗДАТЬ ЗАДАЧУ"
      ></input>
    </form>
  );
}
