import { useState } from "react";
import "./create-form.less";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const handleSubmit = () => {
    alert("submit!");
    return false;
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
        className="form__button buttons"
        type="submit"
        value="Отправить"
      ></input>
    </form>
  );
}
