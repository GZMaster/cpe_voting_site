import React from "react";
import { useNavigate } from "react-router-dom";
import "./VotingCompletedPage.scss";

const VotingCompletedPage = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="voting-completed">
      <div className="voting-completed__container">
        <h1 className="voting-completed__title">Voting Completed</h1>
        <p className="voting-completed__message">
          Thank you for voting. Your vote has been submitted.
        </p>
        <button className="voting-completed__button" onClick={clickHandler}>
          Home
        </button>
      </div>
    </div>
  );
};

export default VotingCompletedPage;
