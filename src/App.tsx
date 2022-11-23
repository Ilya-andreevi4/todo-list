import React from "react";
import CreateForm from "./components/CreateForm/CreateForm";
import Todos from "./components/Todos/Todos";
import { useUserAuth } from "./services/providers/AuthProvider";

function App() {
  const { user, logOut } = useUserAuth();
  return (
    <>
      <header className="header">
        <h2 className="header__title">ToDo App</h2>
        {!user ? (
          <div>
            <button className="header__buttons header__buttons__log">
              Войти
            </button>
            <button className="header__buttons header__buttons__reg">
              Регистрация
            </button>
          </div>
        ) : (
          <button
            onClick={logOut}
            className="header__buttons header__buttons__logout"
          >
            Выйти из {user.email}
          </button>
        )}
      </header>
      <div className="app">
        <CreateForm />
        <Todos />
      </div>
    </>
  );
}

export default App;
