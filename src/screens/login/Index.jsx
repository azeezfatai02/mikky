"use client";

import "./Index.css";
import { useState } from "react";
import { signin, googleSignIn } from "@/app/firebase"; // Import googleSignIn
import { useRouter } from "next/navigation";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError(null); // Reset error state
    setLoading(true); // Set loading state to true

    try {
      await signin(email, password);
      setSuccess(true);
      alert("Login successful!");
      router.push("/home");
    } catch (error) {
      setError(
        error.code === "auth/user-not-found"
          ? "User not found. Please check your email."
          : error.message
      );
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleGoogleLogin = async () => {
    setError(null); // Reset error state
    setLoading(true); // Set loading state to true

    const result = await googleSignIn(); // Call googleSignIn function
    if (result.success) {
      alert("Login with Google successful!");
      router.push("/home");
    } else {
      setError(result.error); // Set error message
    }

    setLoading(false); // Set loading state to false
  };

  return (
    <div className="alllogin">
      <h1>MIKKY NIG ENTERPRISES</h1>
      {error && (
        <p style={{ color: "red" }} aria-live="assertive">
          {error}
        </p>
      )}
      {success && <p>Login successful!</p>}
      <form onSubmit={handleLogin}>
        <h2>LOGIN</h2>
        <div className="formdiv">
          <label htmlFor="email">Email</label>
          <input
            id="email" // Added id for accessibility
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formdiv">
          <label htmlFor="password">Password</label>
          <input
            id="password" // Added id for accessibility
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="fbutton" type="button" disabled={loading}>
          Forget password
        </button>
        <button className="sbutton" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"} {/* Show loading text */}
        </button>
        <div className="google-login">
          <button type="button" onClick={handleGoogleLogin} disabled={loading}>
            {loading ? "Logging in with Google..." : "Login with Google"}
          </button>
        </div>
        <div className="sign">
          <p>Don't have an account?</p>
          <a href="/signup">Signup</a>
        </div>
      </form>
    </div>
  );
}
