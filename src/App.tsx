import EntryForm from "./components/EntryForm/EntryForm";
import { useState } from "react";
import CreateForm from "./components/CreateForm/CreateForm";
import Todos from "./components/Todos/Todos";
import { useUserAuth } from "./services/providers/AuthProvider";
import { useEffect } from "react";
import { IUser } from "models/IUser";

function App() {
  const { user, logOut } = useUserAuth();
  const [openEntryForm, setOpenEntryForm] = useState(false);
  const [typeEntry, setTypeEntry] = useState("");
  const [localUser, setLocalUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user");
      user && setLocalUser(JSON.parse(user));
    } else {
      setLocalUser(null);
    }
  }, [user]);

  return (
    <>
      <header className="header">
        <h2 className="header__title">ToDo App</h2>
        {localUser ? (
          <button
            onClick={() => logOut()}
            className="header__buttons header__buttons__logout buttons"
          >
            Выйти из {localUser.email}
          </button>
        ) : (
          <div>
            <button
              onClick={() => {
                setOpenEntryForm(true);
                setTypeEntry("log");
              }}
              className="header__buttons header__buttons__log buttons"
            >
              Войти
            </button>
            <button
              onClick={() => {
                setOpenEntryForm(true);
                setTypeEntry("reg");
              }}
              className="header__buttons header__buttons__reg buttons"
            >
              Регистрация
            </button>
          </div>
        )}
      </header>
      <div className="app">
        <CreateForm />
        <Todos />
        <EntryForm
          open={openEntryForm}
          setOpen={setOpenEntryForm}
          type={typeEntry}
        />
      </div>
    </>
  );
}

export default App;
