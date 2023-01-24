import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/login/LoginPage";
import PositionPages from "../pages/position/PositionPages";
import VotingPage from "../pages/voting/VotingPage";

const NavConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/position" element={<PositionPages />} />
      </Route>
    </Routes>
  );
};

export default NavConfig;
