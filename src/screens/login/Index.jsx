"use client";

import "./Index.css";
import { useState } from "react";
import { signin } from "@/app/firebase";
// import { getAuth } from "firebase/auth";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  // const auth = getAuth();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signin(email, password);
  //     alert("Login successful!");
  //     router.push("/home");
  //   } catch (error) {
  //     setError(error.message);
  //   }

  const handleLogin = async () => {
    try {
      await signin(email, password);
      alert("Login successful!");
      router.push("/home");
    } catch (error) {
      alert(error.message);
    }

    // e.preventDefault();

    // const result = await signin(email, password);

    // if (result.success) {
    //   console.log(email, password);
    //   setSuccess(true);
    //   router.push("/home");
    //   setError(null);
    // } else {
    //   setError(result.error);
    //   setSuccess(false);
    // }
  };
  return (
    <div className="alllogin">
      <h1>MIKKY NIG ENTERPRISES</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>Signup successful!</p>}
      <form action={handleLogin}>
        <h2>LOGIN</h2>
        <div className="formdiv">
          <label htmlFor="">Username</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formdiv">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="fbutton">Forget password</button>
        <button className="sbutton" type="submit">
          Login
        </button>
        <div className="sign">
          <p>Dont have an account?</p>
          <a href="/signup">Signup</a>
        </div>
      </form>
    </div>
  );
}
