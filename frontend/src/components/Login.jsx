// Login.js
import React, { useState } from "react";
import { useAuthContext } from "../utils/authProvider";

const Login = () => {
  const { login, logout } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const loggedInUser = await login(username, password);
      console.log("loggedInUser", loggedInUser); // Check the value here
      // Redirect or perform actions after login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure here
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect or perform actions after login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure here
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
