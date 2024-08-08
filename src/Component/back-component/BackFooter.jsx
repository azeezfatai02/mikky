import "./BackFooter.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ShopName. All rights reserved.</p>
      </div>
    </footer>
  );
}
