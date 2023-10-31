import React, { useState } from 'react';

function Modal({ isOpen, onClose, children ,onSubmit}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-contents">
        {children}
     
      </div>
    </div>
  );
}
export default Modal