import React, { useState } from "react";
import resetImg from "../images/forgot.svg";
import { AiOutlineClose } from "react-icons/ai";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

const Reset = ({ onLogin }) => {

  const [email, setEmail] = useState("");
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Please check your email ID for a reset link!")
  })
  .catch((error) => {
    alert("Oops.. try again");
  });
  }

  return (
    <div className="main-container --flex-center">
      <div className="form-container reset">
        <form className="--form-control"
        onSubmit={resetPassword}>
          <h2 className="--color-danger --text-center --fw-med">Reset</h2>

          <input type="email" className="--width-100" placeholder="Email" 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
          />

          <button type="submit" className="--btn --btn-primary --btn-block"
         >
            Reset Password
          </button>

          <span className="--text-sm --block --text-center">
            You will shortly receive a reset link!
          </span>
          <div className="close" onClick={onLogin}>
            <AiOutlineClose color="red" />
          </div>
        </form>
      </div>
      <div className="img-container">
        <img src={resetImg} alt="login" />
      </div>
    </div>
  );
};

export default Reset;
