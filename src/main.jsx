import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        autoClose={2000}
        position="top-right"
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
    </BrowserRouter>
  </StrictMode>
);
