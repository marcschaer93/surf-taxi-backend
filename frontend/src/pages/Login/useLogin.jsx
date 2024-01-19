// TEST

// src/pages/Login/useLogin.js

import { useState } from "react";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (field, value) => {
    if (field === "username") {
      setUsername(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling login submission
  };

  return { username, password, handleChange, handleSubmit };
};

export default useLogin;
