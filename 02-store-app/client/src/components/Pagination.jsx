import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <nav
        aria-label="Page navigation example"
        className="flex justify-end mt-4"
      >
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight ${
                currentPage === 1 ? "text-gray-300" : "text-gray-500"
              } bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              Previous
            </button>
          </li>

          {getPageNumbers().map((number) => (
            <li key={number}>
              <button
                onClick={() => onPageChange(number)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                  currentPage === number
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 bg-white"
                } border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
              >
                {number}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight ${
                currentPage === totalPages ? "text-gray-300" : "text-gray-500"
              } bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
