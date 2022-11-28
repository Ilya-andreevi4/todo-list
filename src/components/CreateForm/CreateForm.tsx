import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ITodo from "models/ITodo";
import { useState } from "react";
import dayjs from "dayjs";
import "./create-form.less";
import { useAppContext } from "services/providers/AuthProvider";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>("");
  const [date, setDate] = useState("");
  const { user } = useAppContext();

  const handleSubmit = async () => {
    console.log("file: ");
    console.log(file);
    const userUid =
      (user ? user.uid : "test") +
      dayjs(new Date()).format("DD_MM_YYYYThh_mm_ss");
    if (file) {
      const storageRef = ref(storage, userUid);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("загрузка файла завершилась");

            const newTodo: ITodo = {
              title,
              description,
              complieteDate: date,
              files: downloadURL,
              createDate: dayjs(new Date()).format("DD_MM_YYYYThh_mm_ss"),
              isCompliete: false,
            };

            const userDoc = collection(
              db,
              "users/" + (auth.currentUser ? auth.currentUser.uid : "test"),
              "todos"
            );
            await addDoc(userDoc, newTodo).catch((error) => {
              console.error("Error with upload todo " + error);
            });
          });
        }
      );
    } else {
      const newTodo: ITodo = {
        title,
        description,
        complieteDate: date,
        files: file,
        createDate: dayjs(new Date()).format("DD_MM_YYYYThh_mm_ss"),
        isCompliete: false,
      };

      const userDoc = collection(
        db,
        "users/" + (user ? user.uid : "test"),
        "todos"
      );
      await addDoc(userDoc, newTodo).catch((error) => {
        console.error("Error with upload todo " + error);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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
        aria-label="Файл"
        onChange={(e) => {
          e.target.files && setFile(e.target.files[0]);
        }}
      />
      <label htmlFor="avatar" className="input__label">
        <img src="./image.png" alt="img" />{" "}
        {file ? <span>Файл выбран</span> : <span>Выбрать файл</span>}
      </label>
      <h2 className="form__title">Дата завершения задачи</h2>
      <input
        type="datetime-local"
        className="form__date input"
        min={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
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
