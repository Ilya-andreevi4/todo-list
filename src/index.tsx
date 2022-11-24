import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/Todos/todos.css";
import "./components/CreateForm/create-form.css";
import "./components/EntryForm/entry-form.css";
import App from "./App";
import { UserAuthContextProvider } from "./services/providers/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserAuthContextProvider>
    <App />
  </UserAuthContextProvider>
);
