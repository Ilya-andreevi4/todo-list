import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../services/providers/AuthProvider";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import dayjs from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Todo(todo: any) {
  const { user } = useAuthContext();

  // Id задачи для её дальнейшего редактирования и удаления
  const todoId = todo.todo._document.key.path.segments[8];

  const currentTodo = todo.todo.data();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>(null);
  const [date, setDate] = useState("");
  const [isCompliete, setIsCompliete] = useState(false);
  const [isChangeButton, setIsChangeButton] = useState(false);

  const updateStates = () => {
    // Заносим в стейты актуальную информацию
    setTitle(currentTodo.title);
    setDescription(currentTodo.description);
    setFile(currentTodo.files);
    setDate(currentTodo.complieteDate);
    setIsCompliete(currentTodo.isCompliete);

    // И проверяем не истёк ли дедлайн у задачи
    const currentDate = new Date().getTime();
    const complieteDate = new Date(date).getTime();
    if (date && complieteDate < currentDate) {
      setIsCompliete(true);
      const docRef = doc(
        db,
        "users/" + (user ? user.uid : "test") + "/todos",
        todoId
      );
      updateDoc(docRef, { isCompliete })
        .then(() => console.log("todo успешно изменён!"))
        .catch((e) => console.error(e.message));
    }
  };

  const handleChange = async () => {
    if (!file || file === currentTodo.files) {
      const newTodo = {
        title,
        description,
        createDate: currentTodo.createDate,
        complieteDate: date,
        files: file,
        isCompliete: isCompliete,
      };
      const docRef = doc(
        db,
        "users/" + (user ? user.uid : "test") + "/todos",
        todoId
      );
      await updateDoc(docRef, newTodo)
        .then(() => console.log("todo успешно изменён!"))
        .catch((e) => console.error(e.message));
    } else if (file) {
      //Создаём уникальный путь для отправки файла в хранилище
      const pathId =
        (user ? user.uid : "test") +
        dayjs(new Date()).format("DD_MM_YYYYThh_mm_ss");

      const storageRef = ref(storage, pathId);
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
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.error("ne avtorizovan ", error.code);

              break;
            case "storage/canceled":
              console.error("User canceled the upload ", error.code);
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              console.error(
                "Unknown error occurred, inspect error.serverResponse ",
                error.code
              );

              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("началась загрузка задачи...");
            console.log("id doc: ", todoId);
            const newTodo = {
              title,
              description,
              createDate: currentTodo.createDate,
              complieteDate: date,
              files: downloadURL,
              isCompliete: isCompliete,
            };
            setFile(downloadURL);

            const userDoc = doc(
              db,
              "users/" +
                (auth.currentUser ? auth.currentUser.uid : "test") +
                "/todos",
              todoId
            );

            await updateDoc(userDoc, newTodo).catch((error) => {
              console.error("Error with upload todo " + error);
            });
          });
        }
      );
    }
  };

  const handleDelete = async () => {
    const docRef = doc(
      db,
      "users/" + (user ? user.uid : "test") + "/todos",
      todoId
    );
    await deleteDoc(docRef)
      .then(() => console.log("todo успешно удален!"))
      .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    updateStates();
  }, [user]);

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
  }, [title, description, file, date, currentTodo, isCompliete]);

  return (
    <>
      <input
        type="text"
        className={
          "todo-list__title " + (isCompliete && "todo-list__title__complieted")
        }
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        className={
          "todo-list__description " +
          (isCompliete && "todo-list__description__complieted")
        }
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <input
        type="datetime-local"
        className="todo-list__date"
        min={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <input
        type="file"
        id={todo.id}
        className={file ? "display-none" : "todo-list__file-input input"}
        aria-label="Файл"
        onChange={(e) => {
          e.target.files && setFile(e.target.files[0]);
        }}
      />
      <label htmlFor={todo.id} className="todo-list__label">
        {file === currentTodo.files && (
          <img src={file} alt={file} className="todo-list__files" />
        )}{" "}
        {file && file !== currentTodo.files && <span>Файл выбран</span>}
      </label>

      <div className="todo-list__button-container">
        <button
          className="todo-list__delete-button buttons"
          onClick={() => handleDelete()}
        />
        <button
          className={
            "buttons todo-list__compliete-button " +
            (isCompliete && "todo-list__compliete-button__complieted")
          }
          onClick={() => {
            setIsCompliete(!isCompliete);
            handleChange();
          }}
        />
        <button
          className={
            isChangeButton ? "todo-list__change-button buttons" : "display-none"
          }
          onClick={() => handleChange()}
        />
      </div>
    </>
  );
}
