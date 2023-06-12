import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import "./main.css";
import { OptionsAppContainer } from "./options/OptionsAppContainer.js";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OptionsAppContainer />
  </React.StrictMode>
);
