import { AuthContextProvider } from "services/providers/AuthProvider";
import "./components/CreateForm/create-form.css";
import "./components/EntryForm/entry-form.css";
import ReactDOM from "react-dom/client";
import "./components/Todos/todos.css";
import App from "./App";
import "./index.css";
import "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  //Помещаем приложение в провайдер для авторизации пользователя.
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
