import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../Hook/firebaseConfig";
import Swal from "sweetalert2";

const auth = getAuth(app);

const Registration = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    const emailValid = /\S+@\S+\.\S+/.test(e.target.value);
    if (!emailValid) {
      setError("please enter valid email address");
      return;
    }
    console.log(e.target.value);
    setEmail(e.target.value);
    setError("");
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
    if (!/(?=.{8,})/.test(e.target.value)) {
      setError("password must be at least 8 characters long");
      return;
    }

    if (!/(?=.*[a-zA-Z])/.test(e.target.value)) {
      setError("password should have one uppercase");
      return;
    }
    if (!/(?=.*[!#$@%&? "])/.test(e.target.value)) {
      setError("password should have one Special character");
      return;
    }

    setError("");
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if ((name, email, password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userInfo = userCredential.user;
          setUser(userInfo);
          setError("");
          console.log(userInfo);
          Swal.fire("Good job!", "You clicked the button!", "success");
          updateName();
          verifyEmail();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage + " " + errorCode);
        });
    } else {
      setError("please fill out all input fields");
      return;
    }
  };

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <div className="input-box">
            <p className="text-danger">{error}</p>
            <form action="">
              <input
                onBlur={handleName}
                className="form-control p-3 m-2"
                type="text"
                placeholder="Enter your name"
                required
              />
              <input
                onBlur={handleEmail}
                className="form-control p-3 m-2"
                type="email"
                placeholder="Email"
                required
              />
              <input
                onBlur={handlePassword}
                className="form-control p-3 m-2"
                type="password"
                placeholder="password"
                required
              />
              <p className="link ">
                <Link to="/login" className="text-decoration-none">
                  <small className="text-danger link">
                    already have an account? please login
                  </small>
                </Link>
              </p>
              <input
                onClick={() => setIsDisabled(!isDisabled)}
                className="p-2"
                type="checkbox"
              />{" "}
              <span className="mb-3">accept term & condition</span>
              <br />
              <button
                disabled={isDisabled}
                onClick={handleRegister}
                type="submit"
                className="btn btn-info p-3 w-50 mt-3 fw-bold text-white"
              >
                Register
              </button>
            </form>
          </div>
          <button className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p className="fw-bold">Google SignIn</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
