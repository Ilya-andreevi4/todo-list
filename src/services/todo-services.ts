import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import ITodo from "models/ITodo";

export const addTodo = async (newTodo: ITodo, userId: string) => {
  if (userId) {
    const userDoc = collection(db, "users/" + userId + "/todos");
    console.log(userDoc);
    await addDoc(userDoc, newTodo).catch((error) => {
      var errorMessage = error.message;
      console.error(errorMessage);
    });
  }
};

export const deleteTodo = (id: any, uid: string) => {
  if (uid) {
    const todoDoc = doc(db, "users/" + uid + "/todos", id);
    return deleteDoc(todoDoc).catch((error) => {
      var errorMessage = error.message;
      console.error(errorMessage);
    });
  }
};

export const getAllTodos = async (userId?: string) => {
  //   if (userId) {
  const todosCollectionRef = collection(db, "users/test/todos");
  return await getDocs(todosCollectionRef).catch((error) => {
    var errorMessage = error.message;
    console.error(errorMessage);
  });
  //   }
};

export const getTodo = (id: any, uid: string) => {
  if (uid) {
    const todoDoc = doc(db, "users/test/todos", id);
    return getDoc(todoDoc).catch((error) => {
      var errorMessage = error.message;
      console.error(errorMessage);
    });
  }
};
