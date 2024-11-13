import React, { useEffect, useState } from "react";
import axios from "axios";
import { triggerRefresh } from "../redux/refreshSlice";
import { useSelector } from "react-redux";

const Products = () => {
  const [books, setBooks] = useState([]);
  const refresh = useSelector((state) => state.apiRefresh.refresh);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/book")
      .then((res) => {
        setBooks(res?.data?.books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  return (
    <>
      <section id="books" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Latest Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {books?.map((book) => (
              <div key={book._id} className="bg-white p-4 shadow-md rounded-lg">
                <img
                  src={book?.image}
                  alt="Book"
                  className="w-full h-96 rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{book?.title}</h3>
                <p className="text-sm mt-1">by: {book?.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
