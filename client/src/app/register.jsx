"use client";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { UserContext } from "./page";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const onSubmit = (data, event) => {
    event.preventDefault();
    setUsername(data.username);
    setPassword(data.password);
    registerration();
  };

  const registerration = async (event) => {
    const { data } = await axios.post("http://localhost:8000/register", {
      username: username,
      password: password,
    });
    setLoggedInUsername(username);
    setId(data.id);
  };
  return (
    <div className="bg-blue-50 h-screen flex items-center ">
      <form className="w-64  mx-auto mb-12" onSubmit={handleSubmit(onSubmit)}>
        <input
          // value={username}
          // onChange={(event) => setUsername(event.target.value)}
          type="text"
          {...register("username", { required: "This is required." })}
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => (
            <p className=" text-sm text-red-500">{message}</p>
          )}
        />
        <input
          // value={password}
          // onChange={(event) => setPassword(event.target.value)}
          type="password"
          {...register("password", { required: "This is required." })}
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
          pattern=".{8,}"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className=" text-sm text-red-500">{message}</p>
          )}
        />
        <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          password is must be at least 8 characters
        </span>
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
// !====
// const { data } = await axios.get(
//   "http://localhost:8000/register/668950d979ed313e33b259f4"
// );
// console.log(data.password);

// !=====
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
