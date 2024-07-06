"use client";
import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const register = async (event) => {
    event.preventDefault();
    // !====
    // const { data } = await axios.get(
    //   "http://localhost:8000/register/668950d979ed313e33b259f4"
    // );
    // console.log(data.password);
    // !=====
    // await axios
    // .post("http://localhost:8000/register", {
    //   username: username,
    //   password: password,
    // })
    // .then((response) => {
    //   console.log(response.data);
    // });
    // !=====
    // const { data } = await axios
    //   .post("http://localhost:8000/register", { username, password })
    //   .then( (response)=> {
    //     console.log(response);
    //   })
    //   .catch(console.log("Failed to register"));
    // setLoggedInUsername(username);
    // setId(data.id);
    // !======
  };
  return (
    <div className="bg-blue-50 h-screen flex items-center ">
      <form className="w-64  mx-auto mb-12" onSubmit={register}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
        ></input>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
        ></input>
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
