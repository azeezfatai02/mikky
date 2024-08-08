import Link from "next/link";
import "./BackHeader.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Dashboard</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
