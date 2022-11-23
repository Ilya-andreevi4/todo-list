import { useState } from "react";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const handleSubmit = () => {
    alert("submit!");
    return false;
  };
  return (
    <div className="form">
      <form onSubmit={() => handleSubmit()}>
        <input
          type="text"
          className="form__title-input"
          aria-label="Заголовок задачи"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          className="form__discription-input"
          aria-label="Описание задачи"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          type="file"
          className="form__discription-file"
          aria-label="Дополнительные файлы"
          onChange={(e) => setFile(e.target.value)}
          value={file}
        />
        <input type="submit" value="Отправить"></input>
      </form>
    </div>
  );
}
