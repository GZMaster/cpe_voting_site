import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VotingPage.scss";

const VotingPage = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState([""]);
  const [candidate, setCandidate] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, isLoading] = useState(false);

  const positiondata = [
    "PRESIDENT",
    "VICE PRESIDENT",
    "SECRETARY GENERAL",
    "ASSISTANT SEC. GENERAL",
    "FINANCIAL SECRETARY",
    "DIRECTOR OF WELFARE",
    "DIRECTOR OF SOCIALS",
    "DIRECTOR OF SPORTS",
    "P.R.O.",
  ];

  useEffect(() => {
    isLoading(true);
    const getCandidate = async () => {
      const token = localStorage.getItem("token");

      if (position === "") {
        return;
      }

      const response = await fetch(
        `https://ill-frog-pea-coat.cyclic.app/api/v1/voting?position=${position}&fields=name, getImage`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setCandidate(data.data.candidates);
        isLoading(false);
      } else {
        isLoading(false);
      }
    };

    getCandidate();
  }, [position]);

  useEffect(() => {
    if (isLoading === false) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isLoading]);

  const getVotedPosition = async () => {
    const token = localStorage.getItem("token");

    if (index > positiondata.length - 1 || index < 0) {
      navigate("/votingcomplete");
    }

    if (position === "") {
      return setIndex(index + 1);
    }

    const response = await fetch(
      `https://ill-frog-pea-coat.cyclic.app/api/v1/voting/getposition`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          position,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      return;
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    setPosition(positiondata[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    getVotedPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const clickHandler = (e) => {
    e.preventDefault();

    if (!selectedCandidate) {
      alert("Please select a candidate before continuing.");
    } else {
      if (index !== positiondata.length) {
        submitVote();
      } else {
      }
    }
  };

  const submitVote = async () => {
    const token = localStorage.getItem("token");
    isLoading(true);
    setIsDisabled(true);

    const voteResponse = await fetch(
      `https://ill-frog-pea-coat.cyclic.app/api/v1/voting/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vote: selectedCandidate, position }),
      }
    );

    const data = await voteResponse.json();

    if (data.status === "success") {
      isLoading(false);
      setIsDisabled(false);
      setIndex(index + 1);
      if (index === positiondata.length - 1) {
        const voteComplete = await fetch(
          "https://ill-frog-pea-coat.cyclic.app/api/v1/voting/votecomplete",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const voteResponseData = await voteComplete.json();

        if (voteResponseData.status === "success") {
          navigate("/votingcomplete");
        } else {
          submitVote();
        }
      }
    } else {
      isLoading(false);
      setIsDisabled(false);
      if (data.status === "fail") {
        alert("You have already voted for this position.");
        setIndex(index + 1);
      }

      if (index === positiondata.length - 1) {
        navigate("/votingcomplete");
      }
    }
  };

  return (
    <div className="votingpage_container">
      <div className="votingpage_wrapper">
        <div className="votingpage_header">
          <h1>The office of the {position}</h1>
          {/* <h3>There are x candidates. Vote for your preferred candidate.</h3> */}
        </div>
        <div className="votingpage_body">
          <form className="votingpage_list">
            {candidate.map((candidate) => (
              <div
                key={candidate._id}
                className={`candidate_card ${
                  selectedCandidate === candidate._id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedCandidate(candidate._id);
                  setIsDisabled(false);
                }}
              >
                <img
                  src={`https://ill-frog-pea-coat.cyclic.app/api/v1/voting/image/${candidate._id}`}
                  alt={candidate.name}
                />
                <p>{candidate.name}</p>
              </div>
            ))}
          </form>
          <button onClick={clickHandler} disabled={isDisabled}>
            Vote
          </button>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
