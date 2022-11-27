import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "services/providers/AuthProvider";
import "./components/Todos/todos.css";
import "./components/CreateForm/create-form.css";
import "./components/EntryForm/entry-form.css";
import "./index.css";
import "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
