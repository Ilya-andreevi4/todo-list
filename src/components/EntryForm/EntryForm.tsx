import { useState, FC } from "react";
import { useUserAuth } from "../../services/providers/AuthProvider";
import "./entry-form.less";

export interface EntryFormProps {
  open: boolean;
  setOpen: any;
  type: string;
}
const EntryForm: FC<EntryFormProps> = ({ open, setOpen, type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, logIn } = useUserAuth();
  const handleSubmit = async () => {
    if (type === "reg") {
      try {
        await signUp(email, password);
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      try {
        await logIn(email, password);
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };
  return (
    <div
      className={open ? "entry-form" : "entry-form__closed"}
      onClick={() => setOpen(false)}
    >
      <form
        onSubmit={() => handleSubmit()}
        className="entry-form__box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="entry-form__title">
          {type === "reg"
            ? "Создание нового аккаунта"
            : "Вход в существующий аккаунт"}
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
        <input
          className="entry-form__button buttons"
          type="submit"
          value={type === "reg" ? "Создать аккаунт" : "Войти"}
        ></input>
      </form>
    </div>
  );
};
export default EntryForm;
