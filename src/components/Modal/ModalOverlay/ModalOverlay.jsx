import React from 'react';
import styles from './ModalOverlay.module.css'

const ModalOverlay = ({closeModal}) => {

    const overlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <div className={styles.overlay} onClick={overlayClick} />
    );
};

export default ModalOverlay;
