import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./Styles/App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Index from "./Pages/Index";
import Gameroom from "./Pages/Gameroom";
import Test from "./Pages/Test";
import { io } from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("Auth_token");
    if (token && !socket) {
      const newSocket = io(process.env.NODE_ENV === "development" ? "http://localhost:9999" : "https://okey.erkuttekoglu.com", {
        auth: {
          token: localStorage.getItem("Auth_token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket connected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route 
          path="/" 
          component={Index} 
          exact 
        />
        <Route
          path="/login"
          render={() => <Login setupSocket={setupSocket} />}
          exact
        />
        <Route 
          path="/register" 
          component={Register} 
          exact 
        />
        <Route
          path="/dashboard"
          render={() => <Dashboard socket={socket} />}
          exact
        />
        <Route 
          path="/test" 
          component={Test} 
          exact 
        />
        <Route
          path="/room/:id"
          render={() => <Gameroom socket={socket} />}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
