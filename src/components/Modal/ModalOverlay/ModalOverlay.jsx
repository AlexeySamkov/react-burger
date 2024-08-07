import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ closeModal }) => {
  return (
    <div className={styles.overlay} onClick={closeModal}></div>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;
