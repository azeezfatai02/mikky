"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserPlus } from "lucide-react";
import IsAuthenticated from "@/IsAuthenticated";

export default function Header() {
  const pathname = usePathname();
  //  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = IsAuthenticated();

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
        {isLoggedIn ? (
          <button className="login-button">
            <Link href="/login" className="login-link">
              <UserPlus className="login-icon" />
              LOGIN
            </Link>
          </button>
        ) : (
          <div className="icons">
            <Link href="/profile">
              <img src="/uiw_user.png" alt="User Icon" />
            </Link>

            <Link href="/Cart">
              <img src="/teenyicon.png" alt="Cart Icon" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
