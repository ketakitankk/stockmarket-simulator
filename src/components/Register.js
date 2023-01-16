import { useState, useEffect } from "react";
import registerImg from "../images/register.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { remove_active_user } from "../redux/slice/authSlice";




const Register = ({ onLogin, onShowPassword, onTogglePassword }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [pass, setPass] = useState("");
  const [passLetter, setPassLetter] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passChar, setPassChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [passComplete, setPassComplete] = useState(false);
  // const dispatch = useDispatch();

  const handleShowIndicator = () => {
    setShowIndicator(true);
  };

  const registerUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    const user = userCredential.user;
    // console.log(user);
    // Toast.show("Login now!")
    navigate("/dashboard");
    // alert("Please login!")
    // dispatch(remove_active_user());
  })
      .catch((error) => {
    alert("Please try again...")
    // alert("Error.. please try again");
    // Toast.show("Error...");
  });
  }

  useEffect(() => {
    // check Lower and Uppercase
    if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setPassLetter(true);
    } else {
      setPassLetter(false);
    }

    // Check For Numbers
    if (pass.match(/([0-9])/)) {
      setPassNumber(true);
    } else {
      setPassNumber(false);
    }

    // Check For Special char

    if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setPassChar(true);
    } else {
      setPassChar(false);
    }

    if (pass.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    if (passLetter && passNumber && passChar && passLength) {
      setPassComplete(true);
    } else {
      setPassComplete(false);
    }
  }, [pass, passLetter, passNumber, passChar, passLength]);

  return (
    // <div>
    // <ToastContainer>
    <div className="main-container --flex-center">
      <div className="form-container --m">
        <form className="--form-control" onSubmit={registerUser}>
          <h2 className="--color-danger --text-center --fw-med">Register</h2>
          {/* <input type="text" className="--width-100" placeholder="Username"
            required value={username} onChange={(e) => {
                setUsername(e.target.value)
            }} /> */}
          <input type="email" className="--width-100" placeholder="Email" 
            value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}
          />
          {/* PASSWORD FIELD */}
          <div className="password">
            <input
              type={onShowPassword ? "text" : "password"}
              className="--width-100"
              placeholder="Password"
              onFocus={handleShowIndicator}
              value={pass} onChange={(e) => {
                setPass(e.target.value)
            }}
            />
            <span className="icon" onClick={onTogglePassword}>
              {onShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {/* PASSWORD FIELD */}
          <button
            type="submit"
            disabled={!passComplete}
            className={
              passComplete
                ? "--btn --btn-dark --btn-block"
                : "--btn --btn-dark --btn-block btn-disabled"
            }
          >
            Register
          </button>

          <span className="--text-sm --block">
            Have an account?{" "}
            <Link className="--text-sm" onClick={onLogin}>
              Login
            </Link>
          </span>
          {/* Pass Strength Indicator */}
          <div className={showIndicator ? "show-indicator" : "hide-indicator"}>
            <ul className="--list-style-none --card --bg-grey --text-sm --p">
              <p className="--text-sm">Password Strength Indicator</p>
              <li className={passLetter ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {passLetter ? <FaCheck /> : <GoPrimitiveDot />}
                  &nbsp; Lowercase & Uppercase
                </span>
              </li>
              <li className={passNumber ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {passNumber ? <FaCheck /> : <GoPrimitiveDot />}
                  &nbsp; Numbers (0-9)
                </span>
              </li>
              <li className={passChar ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {passChar ? <FaCheck /> : <GoPrimitiveDot />}
                  &nbsp; Special Character (!@#$%^&*)
                </span>
              </li>
              <li className={passLength ? "pass-green" : "pass-red"}>
                <span className="--align-center">
                  {passLength ? <FaCheck /> : <GoPrimitiveDot />}
                  &nbsp; At least 8 Character
                </span>
              </li>
            </ul>
          </div>
          {/* Pass Strength Indicator */}
        </form>
      </div>
      <div className="img-container">
        <img src={registerImg} alt="login" />
      </div>
    </div>
    // </ToastContainer>
    // </div>
  );
};

export default Register;
