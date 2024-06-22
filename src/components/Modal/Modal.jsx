import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import stylesModal from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) { // 27 is the keyCode for the Esc key
        onClose();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={stylesModal.modalContainer} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button className={stylesModal.closeButton} onClick={onClose}><CloseIcon type="primary" /></button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
