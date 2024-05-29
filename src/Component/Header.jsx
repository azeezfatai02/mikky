import Link from "next/link";
export default function Header() {
  return (
    <header>
      <div className="hopr">
        <Link href="/home">Home</Link>

        <Link href="/product">Product</Link>
      </div>
      <div>
        <h1>MNE</h1>
      </div>
      <div className="icons">
        <a href="#">
          <img src="./teenyicon.png" alt="icon" />
        </a>
        <a href="#">
          <img src="./uiw_user.png" alt="icon" />
        </a>
      </div>
    </header>
  );
}
