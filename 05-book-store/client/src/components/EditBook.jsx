import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "../redux/refreshSlice";
import { useForm } from "react-hook-form";

const EditBook = ({ bookData, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("author", bookData.author);
      setValue("price", bookData.price);
    }
  }, [bookData, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("price", data.price);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    axios
      .patch(`http://localhost:5000/api/v1/book/${bookData?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(triggerRefresh(true));
        reset();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <h1 className="text-3xl font-bold text-center mb-3 text-gray-700">
            Edit book
          </h1>
          <div>
            <label htmlFor="title" className="text-gray-600 text-md">
              Book Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              placeholder="How to get rich"
              className="border transition w-full py-2 px-3 rounded-md focus:outline-none focus-visible:ring mt-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="author" className="text-gray-600 text-md">
              Author Name
            </label>
            <input
              id="author"
              type="text"
              {...register("author", { required: true })}
              placeholder="Donald J. Trump"
              className="border transition w-full py-2 px-3 rounded-md focus:outline-none focus-visible:ring mt-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="price" className="text-gray-600 text-md">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              {...register("price", { required: true })}
              placeholder="12"
              className="border transition w-full py-2 px-3 rounded-md focus:outline-none focus-visible:ring mt-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="image" className="text-gray-600 text-md">
              Book Cover
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              accept="image/*"
              className="border transition w-full py-2 px-3 rounded-md focus:outline-none focus-visible:ring mt-1"
            />
          </div>
          <div className="mt-5 text-end">
            <button className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-md px-10 py-2.5 text-center">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditBook;
