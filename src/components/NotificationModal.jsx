import React, { useState } from "react";
import "./NotificationModal.scss";

const SuccessModal = ({ isOpen, message, onClose }) => {
  return (
    <div className={`success-modal ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="success-modal-content">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null}
    </div>
  );
};

export default SuccessModal;
