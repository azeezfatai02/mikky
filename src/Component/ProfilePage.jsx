"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase"; // Adjust the import based on your file structure
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import "./ProfilePage.css"; // Optional CSS file for styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-info">
          <h2>Welcome, {user.displayName || user.email}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ProfilePage;
