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
    <div className="votingcompleted_container">
      <div className="votingcompleted_wrapper">
        <div className="votingcompleted_header">
          <h1 className="votingcompleted_title">Voting Completed</h1>
          <p className="votingcompleted_message">
            Thank you for voting. Your vote has been submitted.
          </p>
        </div>
        <button className="votingcompleted__button" onClick={clickHandler}>
          Home
        </button>
      </div>
    </div>
  );
};

export default VotingCompletedPage;
