import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PositionPages.scss";

const PositionPages = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getPosition = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://ill-frog-pea-coat.cyclic.app/api/v1/voting/positions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data) {
        setPositions(data.data.positions);
      }
    };

    getPosition();
  }, []);

  const handleClick = () => {
    navigate("/voting", { state: { data: positions } });
  };

  return (
    <div className="positionpages_container">
      <div className="positionpages_wrapper">
        <div className="positionpages_header">
          <h1>...</h1>
          <h3>You’ll be voting for a total of 9 offices</h3>
        </div>
        <div className="positionpages_body">
          <div className="positionpage_list">
            <div className="positionpage_list_item_header">
              {positions &&
                positions.map((position) => {
                  return (
                    <div className="positionpage_list_item">
                      <h3>{position}</h3>
                    </div>
                  );
                })}
            </div>
          </div>
          <button onClick={handleClick}>Begin voting</button>
        </div>
      </div>
    </div>
  );
};

export default PositionPages;
