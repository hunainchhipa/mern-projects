import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Product from "../components/Product";
import Pagination from "../components/Pagination";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/products?page=${currentPage}&name=${search}&sort=${price}`
        );
        setProductData(res?.data?.products);
        setTotalPages(res?.data?.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [currentPage, search, price]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePriceSorting = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-10">
            <div className="flex justify-between">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-sm"
                id="name"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
              <div className="sort-by flex flex-shrink-0 items-center">
                <span>Sort By Price </span>
                <select
                  name="price"
                  id="price"
                  className="focus:outline-none"
                  onChange={handlePriceSorting}
                >
                  <option value="" className="text-center">
                    {" "}
                    Select
                  </option>
                  <option value="price">(Low to High)</option>
                  <option value="-price">(High to Low)</option>
                </select>
              </div>
            </div>

            <section>
              <Product data={productData} />
            </section>

            <section className="pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
