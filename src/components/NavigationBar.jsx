// import React, { Component } from "react";
import logo from "../images/logo.svg";
import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { remove_active_user, set_active_user } from "../redux/slice/authSlice";
import ShowOnLogin from "./hiddenLinks/hiddenLink";
import {ShowOnLogout} from "./hiddenLinks/hiddenLink.js"

const NavigationBar = () => {
  // console.log(isLoggedIn);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log(isLoggedIn);
  const navigate = useNavigate();
  const [uName, setUName] = useState("");
  const dispatch = useDispatch();
  // console.log(isLoggedIn);
  // Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) { 
        // console.log(user);
        user.displayName = user.email.split("@")[0];
        setUName(user.displayName);
        dispatch(set_active_user({
          email: user.email,
          username: user.displayName,
          userID: user.uid
        }));
      } else {
        setUName("");
        dispatch(remove_active_user());
      }
    });
  
  }, [dispatch]);
  

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(remove_active_user())
      navigate("/");
    }).catch((error) => {
      alert('Error... try again!')
    });
  }

  


  return (
    <div>
      <Navbar bg="light" variant={"light"} expand="lg" fixed="top">
        <Navbar.Brand className="stockSim">
          <ShowOnLogout>
          <Nav.Link as={Link} to="/" className="stockSim">
            stockSim
            <img src={logo} alt="logo" className="imgOfLogo" />
          </Nav.Link>
          </ShowOnLogout>
          <ShowOnLogin>
          <div className="stockSim">
          stockSim
          <img src={logo} alt="logo" className="imgOfLogo" />
            </div>
            </ShowOnLogin>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" 
        />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <ShowOnLogin>
            <Nav.Link as={Link} className="portfolio" to="/portfolio">
              {/* <a> */}
              {/* <FaUserCircle size={16} /> */}
                {uName}'s portfolio
              {/* </a> */}
              </Nav.Link>
            </ShowOnLogin>
            
            
            <ShowOnLogout>
              
           <Nav.Link as={Link} to="/about" className="aboutUs">
              about us
                </Nav.Link>
                
            
            <Nav.Link as={Link} to="/features" className="features">
              features
              </Nav.Link>
              </ShowOnLogout>
             <Nav.Link as={Link} to="/contact" className="contactUs">
              contact us
            </Nav.Link>
            <ShowOnLogout>
              
            <Nav.Link as={Link} to="/login" className="signUp">
              login/signup
              </Nav.Link>
              </ShowOnLogout>
            
              <ShowOnLogin>
            <Nav.Link as={Link} to="/dashboard" className="dashLink"
            >
              dashboard
            </Nav.Link>
            </ShowOnLogin>

            <ShowOnLogin>
            <Nav.Link as={Link} to="/" className="signUp"
              onClick={logoutUser}>
              logout
            </Nav.Link>
            </ShowOnLogin>  
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
