import React from "react";
import { useNavigate } from "react-router-dom";
import "./PositionPages.scss";

const PositionPages = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/voting");
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
            <div className="positionpage_list_item">
              <div className="positionpage_list_item_header">
                <h3>President</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>V. President</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>Fin. Sec</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>Sec. Gen</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>Asst. Sec. Gen</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>Dir. of Socials</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>Dir. of Welfare</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>Dir. of Sports</h3>
              </div>
              <div className="positionpage_list_item_header">
                <h3>P.R.O</h3>
              </div>
            </div>
          </div>
          <button onClick={handleClick}>Begin voting</button>
        </div>
      </div>
    </div>
  );
};

export default PositionPages;
