import React from "react";
import ReactDOM from "react-dom";
import "./Logoutmodel.css";
const LogoutModal = ({ message, isOpen, onClose, onLogOut }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="model2">
        <p>{message}</p>
        <div className="btnDiv">
          <button className="close no" onClick={onClose}>
            No
          </button>
          <button className="close yes" onClick={onLogOut}>
            Yes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;
