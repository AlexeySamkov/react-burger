import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "./ModalOverlay/ModalOverlay";


const Modal = ({ children, onClose, header }) => {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const targetModal = document.querySelector("#modal")

  return ReactDOM.createPortal(
    <div className={styles.modalBox}>
      <ModalOverlay closeModal={onClose} />
      <div className={styles.modalContainer} >
        <div className={styles.modalHeader}>
          <h2>{header}</h2>
          <button className={styles.closeButton} onClick={onClose}><CloseIcon type="primary" /></button>
        </div>
        {children}
      </div>
    </div>
    ,
    targetModal
  );
};

export default Modal;
