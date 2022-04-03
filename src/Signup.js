import React, { useState } from "react";
import "./Signup.css";
import reFurbLogo from "./assets/reFurb-logo4_black.png";
import { Link, useHistory } from "react-router-dom";
import { createUser } from "./external_services/UsersApi";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "./external_services/FirebaseConfig";
import "./Signup.css";
import { useStateValue } from "./StateProvider";

function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let allowSignup = false;

  if (email !== "" && password !== "" && password === confirmPassword) {
    allowSignup = true;
  }

  const register = (e) => {
    e.preventDefault();
    //firebase register happens here

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //successfully created a new user with email and password
        const user = result.user;
        sendEmailVerification(user)
          .then((emailResponse) => {
            let userData = {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              createdAt: new Date(
                parseInt(user.metadata.createdAt)
              ).toLocaleString("en-GB"),
            };
            createUser(userData)
              .then((response) => {
                history.push("/");
              })
              .catch((error) => {
                console.error("Error occurred while creating user", error);
              });
          })
          .catch((error) => {
            console.error("Unable to send an email, error:", error);
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={reFurbLogo} alt=""></img>
      </Link>
      <div className="login__container">
        <h1>Sign-Up</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {allowSignup && email === "" ? (
            <div className="login__error">Email field cannot be empty</div>
          ) : (
            ""
          )}
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {allowSignup && password === "" ? (
            <div className="login__error">Password field cannot be empty"</div>
          ) : (
            ""
          )}
          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword !== "" && password !== confirmPassword ? (
            <div className="login__error">Passwords do not match</div>
          ) : (
            ""
          )}
          <button
            onClick={register}
            type="submit"
            disabled={!allowSignup}
            className="login__signInButton"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
