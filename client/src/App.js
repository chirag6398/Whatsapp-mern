import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn/Login.js";
import { useStateValue } from "./StateProvider/Stateprovider";
import getData from "./services/getData";
function App() {
  const [state, dispatch] = useStateValue();

  const getUserData = async () => {
    const data = await getData();
    if (data.status === 200) {
      dispatch({ type: "USER_LOGINED", payload: true });
      dispatch({ type: "USER", payload: data.name });
      dispatch({ type: "ADD_ROOM", payload: data.rooms });
    }
  };
  useEffect(() => {
    getUserData();
  }, [state.triger]);
  return (
    <div className="app">
      {!state.isLogin ? (
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
