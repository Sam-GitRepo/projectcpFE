import React, { useState } from 'react';
import "./index.css";
const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close" onClick={handleClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
