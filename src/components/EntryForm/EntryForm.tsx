import { auth } from "../../firebase";
import { useState, FC } from "react";
import "./entry-form.less";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export interface EntryFormProps {
  open: boolean;
  setOpen: any;
  type: string;
}
const EntryForm: FC<EntryFormProps> = ({ open, setOpen, type }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const isReg = type === "reg";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReg) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((credentials) => {
            console.log(credentials);
            setOpen(false);
          })
          .catch((e) => {
            setErr(true);
            console.error(e.message);
          });
      } catch (err: any) {
        setErr(true);
        console.error(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password).then(
          (credentials) => {
            console.log(credentials);
            setOpen(false);
          }
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div
      className={open ? "entry-form" : "entry-form__closed"}
      onClick={() => setOpen(false)}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="entry-form__box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="entry-form__title">
          {isReg ? "Создание нового аккаунта" : "Вход в существующий аккаунт"}
        </h2>
        <h2 className="entry-form__title">Электронная почта</h2>
        <input
          type="text"
          className="entry-form__title-input input"
          aria-label="Почта"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <h2 className="entry-form__title">Пароль</h2>
        <input
          type="text"
          className="entry-form__discription-input input"
          aria-label="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="entry-form__title">*Минимум 6 знаков</p>
        <input
          className="entry-form__button buttons"
          type="submit"
          value={isReg ? "Создать аккаунт" : "Войти"}
        ></input>
        {err && <h2>Что-то пошло не так...</h2>}
      </form>
    </div>
  );
};
export default EntryForm;
