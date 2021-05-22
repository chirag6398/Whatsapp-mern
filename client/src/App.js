import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn/Login.js";
// import { useStateValue } from "./StateProvider/Stateprovider";

function App() {
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!true ? (
        <LogIn />
      ) : (
        <div className="app_body">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Sidebar />
              </Route>
              <Route exact path="/:roomId">
                <Sidebar />
                <Chat />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
