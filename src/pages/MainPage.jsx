import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";

const MainPage = () => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate("/login");
  };

  return (
    <div className="mainpage_container">
      <div className="mainpage_wrapper">
        <div className="mainpage_header">
          <h1>Vote for your favorite</h1>
        </div>
        <div className="mainpage_body">
          <button onClick={buttonHandler}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
