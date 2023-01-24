// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./VotingCompletedPage.scss";

// const VotingCompletedPage = () => {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState([]);
//   const [voter, setVoter] = useState([]);

//   useEffect(() => {
//     getVoter();
//   }, []);

//   const getVoter = async () => {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`http://127.0.0.1:3000/api/v1/voting/voter`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();

//     if (data.status === "success") {
//       setVoter(data.data.user);
//     } else {
//       console.log("No data");
//     }
//   };

//   const getCandidates = async () => {
//     const token = localStorage.getItem("token");

//     const votedCandidateIds = voter.votedCandidates.map(
//       (candidate) => candidate
//     );

//     const votedCandidates = await Promise.all(
//       votedCandidateIds.map(async (id) => {
//         const response = await fetch(
//           `https://ill-frog-pea-coat.cyclic.app/api/v1/voting?fields=name, getImage`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (data.status === "success") {
//           return data.data.candidates;
//         } else {
//           console.log("No data");
//         }
//       })
//     );

//     const votedCandidatesData = votedCandidates.map((candidate) => ({
//       name: candidate.name,
//       position: candidate.position,
//       image: candidate.imagePath,
//     }));

//     console.log(votedCandidateIds);
//   };

//   const clickHandler = (e) => {
//     e.preventDefault();
//     navigate("/");
//   };

//   getCandidates();

//   return (
//     <div className="voting-completed">
//       <div className="voting-completed__container">
//         <h1 className="voting-completed__title">Voting Completed</h1>
//         <p className="voting-completed__message">
//           Thank you for voting. Your vote has been submitted.
//         </p>
//         <button className="voting-completed__button" onClick={clickHandler}>
//           Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VotingCompletedPage;
