import React from 'react';
import styles from './ModalOverlay.module.css';

interface ModalOverlayProps {
  closeModal: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ closeModal }) => {
  return (
    <div className={styles.overlay} onClick={closeModal}></div>
  );
};

export default ModalOverlay;