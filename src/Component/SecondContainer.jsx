"use client";
import ProductInfo from "./ProductInfo";
import { PRODUCTS } from "../app/Data";
import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";
import "./SecondContainer.css";

export default function SecondContainer() {
  // const [openModal, setOpenModal] = useState(false);
  return (
    <div className="second">
      <div>
        <div className="pro">
          <h2>OUR PRODUCT</h2>

          <Link href="/modal" className="seelink">
            see all
          </Link>
        </div>

        <div className="prods">
          {PRODUCTS.map((item, i) => (
            <ProductInfo
              key={i}
              id={item.id}
              images={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
