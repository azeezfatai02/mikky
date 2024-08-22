"use client";
import "./Signups.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../auth/authent";
import { googleSignIn } from "@/app/firebase";

export default function Signups() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await signup(email, password);
      if (result.success) {
        setSuccess(true);
        router.push("/home");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result.success) {
        setSuccess(true);
        router.push("/home");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during Google sign-in. Please try again.");
    }
  };

  return (
    <div className="allsign">
      <h1>MIKKY NIG ENTERPRISES</h1>
      <form onSubmit={handleSignup}>
        <h2>SIGNUP</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p>Signup successful!</p>}
        <div>
          <label htmlFor="firstName" className="name">
            First Name
          </label>
          <div className="for-names">
            <div className="joinname">
              <input type="text" id="firstName" required />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="joinname">
              <input type="text" id="lastName" required />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
          <div className="joinother">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="joinother">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email} // Assuming username is the same as email
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="joinother">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="joinother">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">SIGNUP</button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-signin"
        >
          Sign in with Google
        </button>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}
