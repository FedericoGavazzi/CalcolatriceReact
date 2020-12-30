import React from "react";
import ReactDOM from "react-dom";



import { App } from "./app";
import { Footer } from "./Altro"
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <div className="d-flex justify-content-center align-middle">
      <App titolo="Calcolatrice"/>
    </div>
    <Footer />
  </React.StrictMode>,
  rootElement
);

