import React, { useState } from "react";
import loginImg from "../images/login.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const Login = ({ onRegister, onReset, onTogglePassword, onShowPassword, onSubmit }) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate();
  
  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    const user = userCredential.user;
    // user.displayName = user.email.split("@")[0];
    // user.updateProfile({
    //   displayName: user.email.split("@")[0]
    // });
    // set_active_user();
    console.log(user);
    navigate("/dashboard");
  })
  .catch((error) => {
    alert("Error... please try again!");
  });

  }

  return (
    <div className="main-container --flex-center">
      <div className="img-container">
        <img src={loginImg} alt="login" />
      </div>
      <div className="form-container">
        <form className="--form-control"
        onSubmit={loginUser}>
          <h2 className="--color-danger --text-center --fw-med">Login</h2>
          <input type="text" className="--width-100" placeholder="Email" 
            value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}
          />
          <div className="password">
            <input
              type={onShowPassword ? "text" : "password"}
              className="--width-100"
              placeholder="Password"
              value={pass} onChange={(e) => {
                setPass(e.target.value)
            }}
            />
            <span className="icon" onClick={onTogglePassword}>
              {onShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button type="submit" className="--btn --btn-success --btn-block"
          onClick={onSubmit}>Login</button>
          <Link className="--text-sm" onClick={onReset}>
            Forgot password
          </Link>
          <span className="--text-sm --block">
            Don't have an account?{" "}
            <Link className="--text-sm" onClick={onRegister}>
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
