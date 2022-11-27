import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import app from "../../Hook/firebaseConfig";
import Swal from "sweetalert2";

const auth = getAuth(app);

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        Swal.fire("Good job!", "You clicked the button!", "success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="mt-5">
      <input
        onBlur={handleEmail}
        type="email"
        className="w-50 form-control mx-auto"
        placeholder="email"
      />
      <br />
      <button onClick={handleResetPassword} className="btn btn-primary">
        Update Password
      </button>
    </div>
  );
};

export default ResetPassword;
