import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import logo from "./assets/images/acesLogo_small.png";

function App() {
  return (
    <div className="App">
      <div className="logo_div">
        <img src={logo} alt="logo" />
      </div>

      <Outlet />
    </div>
  );
}

export default App;
