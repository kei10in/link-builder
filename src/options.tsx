import "./main.css";
import { OptionsApp } from "./options/OptionsApp";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>
);
