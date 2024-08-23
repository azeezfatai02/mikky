"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ShoppingCart, UserPlus, Menu } from "lucide-react"; // Import Menu icon
import useIsAuthenticated from "@/IsAuthenticated";
import { signOut } from "firebase/auth";
import "./Header.css";

export default function Header() {
  const pathname = usePathname();
  const user = useIsAuthenticated();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

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
      {user && (
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <Menu />
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/home" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link href="/product" onClick={toggleMobileMenu}>
            Product
          </Link>
          {!user ? (
            <Link href="/login" onClick={toggleMobileMenu}>
              LOGIN
            </Link>
          ) : (
            <>
              <Link href="/Cart" onClick={toggleMobileMenu}>
                Cart
              </Link>
              <Link href="/profile" onClick={toggleMobileMenu}>
                Profile
              </Link>
              <button onClick={handleLogout} className="bvb">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
