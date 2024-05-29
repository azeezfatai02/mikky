import React from "react";
import ProductInfo from "@/Component/ProductInfo";
// import PRODUCTS from "../Data";
import { ALLPRODUCTS } from "../Data";

export default function Products() {
  return (
    <div className="allprod">
      <h1>OUR PRODUCT</h1>
      <div className="prodses">
        {ALLPRODUCTS.map((item) => (
          <ProductInfo
            images={item.image}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
