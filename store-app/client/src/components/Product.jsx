import React from "react";
import { formattedAmount } from "./formattedAmount";

const Product = (props) => {
  const data = props?.data;
  console.log("data", data);

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-5">
        {data.map((product) => {
          return (
            <div className="mb-12" key={product?._id}>
              <div className="h-56">
                <img
                  src={product?.image}
                  alt="product"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex justify-between mt-2">
                <p className="product-name">{product?.name}</p>
                <p className="price">{formattedAmount(product?.price)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
