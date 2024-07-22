"use client";
import "./Signups.css";
import { useEffect, useState } from "react";
// import { auth } from "../../app/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signup } from "../auth/authent";

export default function Signups() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const result = await signup(email, password);

    if (result.success) {
      setSuccess(true);
      router.push("/home");
      setError(null);
    } else {
      setError(result.error);
      setSuccess(false);
    }
  };

  return (
    <div className="allsign">
      <h1>MIKKY NIG ENTERPRICES</h1>

      <form onSubmit={handleSignup}>
        <h2>SIGNUP</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p>Signup successful!</p>}
        <div>
          <label htmlFor="" className="name">
            NAMES
          </label>
          <div className="for-names">
            <div className="joinname">
              <input type="text" />
              <label htmlFor="">First Name</label>
            </div>
            <div className="joinname">
              <input type="text" />
              <label htmlFor="">Name</label>
            </div>
          </div>
          <div className="joinother">
            <label htmlFor="">Email</label>
            <input type="email" />
          </div>
          <div className="joinother">
            <label htmlFor="">Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="joinother">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="joinother">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button>SIGNUP</button>
        <p>
          Already have an account <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}
