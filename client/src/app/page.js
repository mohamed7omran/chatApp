"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import App from "./app";

export const UserContext = createContext({});

export default function Main() {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get("/profile").then((response) => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);

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
