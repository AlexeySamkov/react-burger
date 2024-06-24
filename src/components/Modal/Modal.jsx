import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ isOpen, children, onClose, header }) => {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
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
    <div className={styles.overlay} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div className={styles.modalContainer} >
        <div onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>{header}</h2>
            <button className={styles.closeButton} onClick={onClose}><CloseIcon type="primary" /></button>
          </div>
          {children}
        </div>
      </div>
    </div >
    ,
    document.querySelector("#modal")
  );
};

export default Modal;
