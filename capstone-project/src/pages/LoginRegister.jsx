import React, { useEffect, useState } from "react";
import "../Css/need.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginRegister = () => {
  const navetage = useNavigate();
  //login
  const [userPassword, setUserPassword] = useState("");
  const [userUserName, setUserUserName] = useState("");

  //register
  const [userEmail, setUserEmail] = useState("");
  const [userChoosePassword, setUserChoosePassword] = useState("");
  const [userConfimPassword, setUserConfimPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userSubmit, setUserSubmit] = useState("");

  //create transition between login and register
  const [action, setAction] = useState("");
  const registerLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };

  //body
  useEffect(() => {
    document.body.classList.add("bodyloginRgister");
    return () => {
      document.body.classList.remove("bodyloginRgister");
    };
  }, []);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    //login
    if (!userUserName || !userPassword) {
      setUserSubmit("Please fill out all fields.");
      return;
    }
    if (userPassword.length < 5) {
      setUserSubmit("Password must be at least 5 character long");
      return;
    }

    axios
      .post(`http://localhost:8080/api/users/login`, {
        userName: userUserName,
        password: userPassword,
      })
      .then((response) => {
        if (response.data.result != 200) {
          setUserSubmit(response.data.error);
          return;
        }
        navetage("/HomePage");
      })
      .catch((error) => {
        setUserSubmit(String(error));
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    //register
    if (
      !userUserName ||
      !userEmail ||
      !userChoosePassword ||
      !userConfimPassword
    ) {
      setUserSubmit("Please fill out all fields.");
      return;
    }
    if (userChoosePassword !== userConfimPassword) {
      setUserSubmit("Passwords do not match.");
      return;
    }

    if (userChoosePassword.length < 5) {
      setUserSubmit("Password must be at least 5 character long");
      return;
    }

    if (!agreeTerms) {
      setUserSubmit("Please agree to the terms & conditions.");
      return;
    }
    axios
      .post(`http://localhost:8080/api/users/create`, {
        userName: userUserName,
        emailId: userEmail,
        password: userChoosePassword,
      })
      .then((response) => {
        if (response.data.result != 200) {
          setUserSubmit(response.data.error);
          return;
        }
        loginLink();
        setUserSubmit("Successful registration");
      })
      .catch((error) => {
        setUserSubmit(String(error));
      });
  };

  return (
    <div className={`wrapper${action}`}>
      <div className="form-box login">
        <form onSubmit={handleSubmit1}>
          <h1>Login</h1>
          <p>{userSubmit}</p>
          <div className="input-box">
            <input
              type="text"
              value={userUserName}
              placeholder="Username"
              onChange={(e) => setUserUserName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              value={userPassword}
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <form onSubmit={handleSubmit2}>
          <h1>Register</h1>
          <p>{userSubmit}</p>
          <div className="input-box">
            <input
              type="text"
              value={userUserName}
              placeholder="Username"
              onChange={(e) => setUserUserName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              value={userEmail}
              name="userEmail"
              placeholder="Email Address"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              value={userChoosePassword}
              name="userChoosePassword"
              placeholder="Choose password"
              onChange={(e) => setUserChoosePassword(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              value={userConfimPassword}
              name="userConfimPassword"
              placeholder="Confirm password"
              onChange={(e) => setUserConfimPassword(e.target.value)}
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                value={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />{" "}
              I agree to the terms & condtions
            </label>
          </div>

          <button type="submit">Register</button>

          <div className="register-link">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={loginLink}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
