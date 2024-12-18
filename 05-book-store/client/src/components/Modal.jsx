import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed z-20 inset-0 flex justify-center items-center transition-colors ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow-2xl border-t p-7 transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
