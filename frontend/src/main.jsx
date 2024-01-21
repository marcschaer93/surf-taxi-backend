import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./utils/mainTheme.js";
import { AuthProvider } from "./utils/authProvider.jsx";
import ReactErrorBoundary from "./components/ReactErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <ReactErrorBoundary>
            <ToastContainer />
            <App />
          </ReactErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
