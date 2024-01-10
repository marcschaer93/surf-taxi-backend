// Login.js
import React, { useState } from "react";
import { useAuthContext } from "../utils/authProvider";

export const Login = () => {
  const { login, logout, user } = useAuthContext();

  const [credentials, setCredentials] = useState({
    username: "testuser",
    password: "password",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};
