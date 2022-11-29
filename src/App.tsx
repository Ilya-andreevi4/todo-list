import { useAuthContext } from "./services/providers/AuthProvider";
import CreateForm from "./components/CreateForm/CreateForm";
import EntryForm from "./components/EntryForm/EntryForm";
import Todos from "./components/Todos/Todos";
import { useState } from "react";
import React from "react";

function App() {
  const { user, logOut } = useAuthContext();

  // Окно для регистрации или входа в аккаунт
  const [openEntryForm, setOpenEntryForm] = useState(false);
  const [typeEntry, setTypeEntry] = useState("");

  return (
    <>
      <header className="header">
        <h2 className="header__title">ToDo App</h2>
        {user ? (
          <button
            onClick={() => logOut()}
            className="header__buttons header__buttons__logout buttons"
          >
            Выйти из {user.email}
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
