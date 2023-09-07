import React from "react";

const Modal = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-2 rounded">
        <p>Modal</p>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
