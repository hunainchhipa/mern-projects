import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { triggerRefresh } from "../redux/refreshSlice";
import Modal from "./Modal";
import EditBook from "./EditBook";

const Products = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);
  const refresh = useSelector((state) => state.apiRefresh.refresh);
  const dispatch = useDispatch();

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

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/book/${id}`)
      .then((res) => {
        dispatch(triggerRefresh(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClick = (book) => {
    setOpen(true);
    setSelectedBook(book);
  };

  return (
    <>
      <section id="books" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Latest Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books?.map((book) => (
              <React.Fragment key={book._id}>
                <div className="bg-white p-4 shadow-md rounded-lg relative books-card group">
                  <div className="action-icons opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute cursor-pointer top-5 right-5 bg-white rounded-full p-2">
                      <FiEdit
                        className="text-xl text-green-900"
                        onClick={() => handleEditClick(book)}
                      />
                    </div>
                    <div className="absolute cursor-pointer top-16 right-5 bg-white rounded-full p-2">
                      <MdDelete
                        className="text-xl text-red-900"
                        onClick={() => {
                          deleteBook(book?._id);
                        }}
                      />
                    </div>
                  </div>
                  <img
                    src={book?.image}
                    alt="Book"
                    className="w-full h-96 rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{book?.title}</h3>
                  <p className="text-sm mt-1">by: {book?.author}</p>
                  <div className="flex justify-between mt-2">
                    <h3 className="text-lg font-semibold">${book?.price}</h3>
                    <button
                      type="button"
                      className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <EditBook bookData={selectedBook} onClose={() => setOpen(false)} />
        </Modal>
      </section>
    </>
  );
};

export default Products;
