"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ShoppingCart, UserPlus } from "lucide-react";
import useIsAuthenticated from "@/IsAuthenticated";
import { signOut } from "firebase/auth";

export default function Header() {
  const pathname = usePathname();
  //  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useIsAuthenticated();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setIsLoggedIn(!!user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <header className="header">
      <div className="hopr">
        <Link
          className={`link ${pathname === "/" ? "active" : ""}`}
          href="/home"
        >
          Home
        </Link>

        <Link
          className={`link ${pathname === "/product" ? "active" : ""}`}
          href="/product"
        >
          Product
        </Link>
      </div>
      <div>
        <h1>MNE</h1>
      </div>
      <div>
        {!user ? (
          <button className="login-button">
            <Link href="/login" className="login-link">
              <UserPlus className="login-icon" />
              LOGIN
            </Link>
          </button>
        ) : (
          <div className="icons">
            <Link href="/Cart">
              <ShoppingCart />
            </Link>

            <Link href="/profile">
              <UserPlus />
            </Link>

            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
