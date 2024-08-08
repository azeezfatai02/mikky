"use client";
import Link from "next/link";
import "./BackSidebar.css";
import { QrCode, BedDouble, ChevronDown, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Link href="/home">
          <h1>MNE</h1>
        </Link>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link href="/back-end/dashboard" className="arr">
            <QrCode />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/back-end/orders" className="arr">
            <ShoppingBag />
            Orders
          </Link>
        </li>
        <li onClick={toggleDropdown} className="arrs">
          <span>
            <BedDouble /> Product
          </span>
          <span>
            <ChevronDown />
          </span>
        </li>
        {selectedOption}
        {isOpen && (
          <ul>
            <li>
              <Link
                href="/back-end/manage-product"
                onClick={() => handleOptionClick("")}
                className="arr"
              >
                Manage Product
              </Link>
            </li>
            <li>
              <Link
                href="/back-end/add-product"
                onClick={() => handleOptionClick("")}
                className="arr"
              >
                Add Product
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
}
