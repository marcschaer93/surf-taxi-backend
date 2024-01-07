// Login.js
import React, { useState } from "react";
import { useAuthContext } from "../utils/authProvider";

const Login = () => {
  const { login, logout } = useAuthContext();

  const [credentials, setCredentials] = useState({
    username: "marcschaer",
    password: "Marc1993",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(credentials);
      console.log("loggedInUser", loggedInUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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

//   const [username, setUsername] = useState("marcschaer");
//   const [password, setPassword] = useState("Marc1993");

//   const handleLogin = async () => {
//     try {
//       const loggedInUser = await login(username, password);
//       console.log("loggedInUser", loggedInUser); // Check the value here
//       // Redirect or perform actions after login
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Handle login failure here
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       // Redirect or perform actions after login
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Handle login failure here
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

export default Login;
