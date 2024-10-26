import React from "react";

const Sidebar = ({ setCompany, priceRange, setPriceRange }) => {
  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setCompany(value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceRange(value);
  };

  const handleClearFilter = () => {
    setCompany("");
    setPriceRange(500);
  };

  return (
    <>
      <div className="sidebar">
        <section>
          <h1 className="text-2xl font-semibold mb-5">Categories</h1>
          <ul className="gap-3 flex flex-col">
            <li className={`text-gray-500 cursor-pointer w-fit`}>All</li>
            <li className={`text-gray-500 cursor-pointer w-fit`}>Office</li>
            <li className={`text-gray-500 cursor-pointer w-fit`}>
              Living Room
            </li>
            <li className={`text-gray-500 cursor-pointer w-fit`}>Kitchen</li>
            <li className={`text-gray-500 cursor-pointer w-fit`}>Bedroom</li>
            <li className={`text-gray-500 cursor-pointer w-fit`}>Dining</li>
            <li className={`text-gray-500 cursor-pointer w-fit`}>Kids</li>
          </ul>
        </section>

        <section>
          <h1 className="text-2xl font-semibold my-5">Company</h1>
          <select
            onChange={handleCompanyChange}
            name="company"
            id="company"
            className="w-full p-3 ps-0 focus:outline-none"
          >
            <option value="">All</option>
            <option value="marcos">Marcos</option>
            <option value="liddy">Liddy</option>
            <option value="ikea">Ikea</option>
            <option value="caressa">Caressa</option>
          </select>
        </section>

        <section>
          <h1 className="text-2xl font-semibold my-5">Price</h1>
          <p className="mb-3">${priceRange}</p>
          <input
            type="range"
            min={"0"}
            max={"1000"}
            name="numericFilters"
            id="numericFilters"
            value={priceRange}
            onChange={handlePriceChange}
          />
        </section>

        <div className="clear-filter mt-7">
          <button
            onClick={handleClearFilter}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
