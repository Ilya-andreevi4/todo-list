import { db } from "../../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import ITodo from "models/ITodo";
import { useState } from "react";
// import { addTodo } from "services/todo-services";
import "./create-form.less";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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
      createDate: new Date(),
      isCompliete: false,
    };
    try {
      //
      const userName = auth.currentUser?.uid
      const storageRef = ref(storage, userName);
          const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(, {
            displayName: userName,
            photoURL: downloadURL,
          });
        });
      }
    );
//
      const userDoc = collection(db, "users/test/todos");
      console.log(userDoc);
      await addDoc(userDoc, newTodo).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });

      // addTodo(newTodo, "test")
      //     .then(() => console.log("задача создана"))
      //     .catch((e) => console.error("Error with create task: ", e));
    } catch (e) {
      console.error(e);
    }
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
        id="avatar"
        className="entry-form__file-input input"
        aria-label="Аватар"
        onChange={(e) => setFile(e.target.value)}
        value={file}
      />
      <label htmlFor="avatar" className="input__label">
        <img src="./image.png" alt="img" /> <span>Выбрать файл</span>
      </label>
      <h2 className="form__title">Дата завершения задачи</h2>
      <input
        type="datetime-local"
        className="form__date input"
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
