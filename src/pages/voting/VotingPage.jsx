import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./VotingPage.scss";

const VotingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const getCandidate = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/voting?position=${position}&fields=name, picture`,
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
    } else {
      console.log("No data");
    }
  };

  useEffect(() => {
    getCandidate();
  }, [position]);

  useEffect(() => {
    setPosition(location.state.data[index]);
  }, [location, index]);

  const clickHandler = (e) => {
    e.preventDefault();

    if (!selectedCandidate) {
      alert("Please select a candidate before continuing.");
    } else {
      if (index !== location.state.data.length) {
        submitVote();
      } else {
      }
    }
  };

  const submitVote = async () => {
    const token = localStorage.getItem("token");

    const voteResponse = await fetch(`http://127.0.0.1:3000/api/v1/voting/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vote: selectedCandidate }),
    });

    const data = await voteResponse.json();

    console.log(data);

    if (data.status === "success") {
      console.log("Vote submitted successfully");
      setIndex(index + 1);
      if (index === location.state.data.length - 1) {
        const voteComplete = await fetch(
          "http://127.0.0.1:3000/api/v1/voting/votecomplete",
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
          navigate("/");
        } else {
          console.log("Vote not submitted");
          submitVote();
        }
      }
    } else {
      if (data.error.statusCode === 400) {
        alert(data.message);
        setIndex(index + 1);
      }
      console.log("Vote not submitted");

      if (index === location.state.data.length - 1) {
        navigate("/");
      }
    }
  };

  return (
    <div className="votingpage_container">
      <div className="votingpage_wrapper">
        <div className="votingpage_header">
          <h1>For the office of the ...</h1>
          <h3>There are x candidates. Vote for your preferred candidate.</h3>
        </div>
        <div className="votingpage_body">
          <form className="votingpage_list">
            {candidate.map((candidate) => (
              <div key={candidate._id} className="candidate_card">
                <input
                  type="radio"
                  name="candidate"
                  value={candidate._id}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  checked={selectedCandidate === candidate._id}
                />
                <img src={candidate.picture} alt={candidate.name} />
                <p>{candidate.name}</p>
              </div>
            ))}

            <button onClick={clickHandler}>Vote</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
