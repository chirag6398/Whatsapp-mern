import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initialState, reducer } from "./StateProvider/Reducer";
import { StateProvider } from "./StateProvider/Stateprovider";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
