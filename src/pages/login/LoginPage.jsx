import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/NotificationModal";
import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, isLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = React.useState({
    matno: "",
    password: "",
  });

  useEffect(() => {
    if (isDisabled) {
      return;
    }
  }, [isDisabled]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { matno, password } = form;
      isLoading(true);

      const response = await fetch(
        "https://ill-frog-pea-coat.cyclic.app/api/v1/voting/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matno,
            password,
          }),
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        data.token && localStorage.setItem("token", data.token);
        isLoading(false);
        setIsSuccessModalOpen(true);
        setSuccessMessage("Data submitted successfully!");
        navigate("/position");
      }
      if (data.status === "fail") {
        isLoading(false);
        setIsSuccessModalOpen(true);
        if (response.status === 405) {
          setSuccessMessage("You have already voted");
        } else {
          setSuccessMessage(`Incorrect matric number or password`);
        }
      }
    } catch (error) {
      isLoading(false);
      setIsSuccessModalOpen(true);
      setSuccessMessage("An error occured, please try again!");
    }
  };

  function handleSuccessModalClose() {
    setIsSuccessModalOpen(false);
  }

  useEffect(() => {
    const isEmpty = Object.entries(form).some(
      ([key, value]) => key !== "email" && value === ""
    );
    setIsDisabled(isEmpty);
  }, [form]);

  return (
    <div className="loginpage_container">
      <div className="loginpage_wrapper">
        <div className="loginpage_header">
          <h1>Welcome to ACES Voting Site</h1>
        </div>
        <div className="loginpage_body">
          <h1>Enter your matriculation number to begin</h1>
          <form className="loginpage_form" onSubmit={handleSubmit}>
            <div className="input_wrapper">
              <label className="form_label">Mat Number</label>
              <input
                className="form_control"
                type="text"
                placeholder="Enter your mat number"
                name="matno"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input_wrapper">
              <label className="form_label">Password</label>
              <input
                className="form_control"
                type="text"
                placeholder="Enter your password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="form_button" type="submit" disabled={true}>
              Log In
            </button>
          </form>
          {loading && <p>Loading...</p>}
          <SuccessModal
            isOpen={isSuccessModalOpen}
            message={successMessage}
            onClose={handleSuccessModalClose}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
