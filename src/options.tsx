import "./main.css";
import { OptionsAppContainer } from "./options/OptionsAppContainer.js";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OptionsAppContainer />
  </React.StrictMode>
);
