import Link from "next/link";

export default function Foot() {
  return (
    <footer>
      <div>
        <h1>MIKKY NIG ENTERPRISE</h1>
      </div>

      <div className="footlink">
        <Link href="/home">Home</Link>

        <Link href="/product">Product</Link>
      </div>
    </footer>
  );
}
