import { useState } from "react";
import "./AuthContainer.css";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";

const AuthContainer = () => {
  const [auth, setAuth] = useState({
    login: true,
    register: false,
    reset: false,
  });
  // console.log(auth);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // const [login, setLogin] = useState(true);
  // const [register, setRegister] = useState(false);
  // const [reset, setReset] = useState(false);

  const handleLogin = () => {
    setAuth({ login: true, register: false, reset: false });
    // setReset(false);
    // setLogin(true);
    // setRegister(false);
  };

  const handleRegister = () => {
    setAuth({ login: false, register: true, reset: false });
    // setLogin(false);
    // setRegister(true);
    // setReset(false);
  };
  const handleReset = () => {
    setAuth({ login: false, register: false, reset: true });
    // setLogin(false);
    // setReset(true);
    // setRegister(false);
  };

  const onSubmit = () => {
    
  }

  return (
    <>
        {auth.login && (
          <Login
            onRegister={handleRegister}
            onReset={handleReset}
            onShowPassword={showPassword}
            onTogglePassword={handleTogglePassword}
            onSubmit={onSubmit}
          />
        )}
        {auth.register && (
          <Register
            onLogin={handleLogin}
            onShowPassword={showPassword}
          onTogglePassword={handleTogglePassword}
          onSubmit={onSubmit}
          />
        )}
        {auth.reset && <Reset onLogin={handleLogin} />}
      </>
  );
};

export default AuthContainer;
