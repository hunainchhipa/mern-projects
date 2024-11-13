import React from "react";

const AboutUs = () => {
  return (
    <>
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <p className="text-md mb-4">
                Welcome to the Library, where knowledge meets community!
                Established with the vision of fostering a love for reading and
                learning, our library is more than just a place to borrow
                books—it’s a space for inspiration, discovery, and connection.
                From classic literature to the latest bestsellers, we offer a
                diverse range of resources that cater to readers of all ages and
                interests.
              </p>
              <p className="text-md">
                At this Library, we believe in the power of stories and
                information to transform lives. Our dedicated team of librarians
                and staff work tirelessly to maintain a welcoming, inclusive
                environment that nurtures curiosity and supports lifelong
                learning. We also provide access to various digital resources,
                community events, and workshops aimed at empowering our patrons
                to explore, create, and grow. Whether you're here to find a
                quiet space to read, research a topic, or connect with fellow
                book lovers, our library offers something for everyone. Join us
                in our mission to make knowledge accessible to all, and be part
                of our vibrant, ever-growing community.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://plus.unsplash.com/premium_photo-1681681061615-623d024005ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Library"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
