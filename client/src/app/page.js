"use client";
import { createContext, useState } from "react";
import axios from "axios";
import App from "./app";

export const UserContext = createContext({});

export default function Main() {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  // !new
  axios.defaults.baseURL = "http://localhost:8000";
  // for set cookies from api
  axios.defaults.withCredentials = true;
  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      <App />
    </UserContext.Provider>
  );
}
