import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { triggerRefresh } from "../redux/refreshSlice";
import { useDispatch } from "react-redux";

const UploadBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data?.title);
    formData.append("author", data?.author);
    formData.append("price", data?.price);
    formData.append("image", data?.image[0]);

    axios
      .post("http://localhost:5000/api/v1/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(triggerRefresh(true));
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section id="upload-book" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Upload Book
          </h2>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="upload book"
                className="h-full object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-5 shadow-md rounded-lg border-t">
                  <div>
                    <label htmlFor="title" className="text-gray-600 text-md">
                      Book Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      {...register("title", {
                        required: true,
                      })}
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
                      {...register("author", {
                        required: true,
                      })}
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
                      {...register("price", {
                        required: true,
                      })}
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
                      {...register("image", {
                        required: true,
                      })}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadBook;
