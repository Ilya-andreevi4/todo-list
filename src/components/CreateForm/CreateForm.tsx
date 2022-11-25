import { db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import ITodo from "models/ITodo";
import { useEffect, useState } from "react";
import "./create-form.less";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";
import { IUser } from "models/IUser";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState<IUser | null>(auth.currentUser);

  const handleSubmit = async () => {
    try {
      const userUid = user?.uid + dayjs(new Date()).format("DD/MM/YYYY");
      const storageRef = ref(storage, userUid);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        () => {},
        // (snapshot) => {
        //   const progress =
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log("Upload is " + progress + "% done");
        //   switch (snapshot.state) {
        //     case "paused":
        //       console.log("Upload is paused");
        //       break;
        //     case "running":
        //       console.log("Upload is running");
        //       break;
        //   }
        // },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const newTodo: ITodo = {
              title,
              description,
              complieteDate: date,
              files: downloadURL,
              createDate: new Date(),
              isCompliete: false,
            };
            const userDoc = collection(db, "users/" + user?.uid + "/todos");
            await addDoc(userDoc, newTodo).catch((error) => {
              console.error(error.message);
            });
          });
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else if (localStorage.getItem("user")) {
      const isUser = localStorage.getItem("user");
      isUser && setUser(JSON.parse(isUser));
    } else return;
  }, []);

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
        aria-label="Файл"
        onChange={(e) => {
          e.target.files && setFile(e.target.files[0]);
        }}
      />
      <label htmlFor="avatar" className="input__label">
        <img src="./image.png" alt="img" />{" "}
        {file ? <span>{JSON.stringify(file)}</span> : <span>Выбрать файл</span>}
      </label>
      <h2 className="form__title">Дата завершения задачи</h2>
      <input
        type="datetime-local"
        className="form__date input"
        name="compliete-task-time"
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
