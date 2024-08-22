import Link from "next/link";
import "./Foot.css";

export default function Foot() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <h1>MIKKY NIG ENTERPRISE</h1>
          <p>123 Business St, Lagos, Nigeria</p>
          <p>Email: contact@mikkynig.com</p>
          <p>Phone: +234 806 678 1722</p>
        </div>

        <div className="footer-links">
          <Link href="/home" aria-label="Home Page">
            Home
          </Link>
          <Link href="/product" aria-label="Product Page">
            Product
          </Link>
        </div>
      </div>
    </footer>
  );
}
