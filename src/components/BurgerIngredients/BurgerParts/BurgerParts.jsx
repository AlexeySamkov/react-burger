import { useState } from 'react';
import styles from './BurgerParts.module.css';
import subtract from './../../../images/subtract.svg'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from './../../Modal/Modal'
import { burgerPartShape } from './../../../utils/types';
import IngredientDetails from './../IngredientDetails/IngredientDetails'
import { useModal } from './../../../hooks/useModal'

const BurgerParts = ({ burgerpart }) => {

  const [currentIngredient, setCurrentIngredient] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleOpenModal = (item) => {
    setCurrentIngredient(item);
    openModal();
  }

  const getHeading = (type) => {
    switch (type) {
      case 'bun':
        return 'Булки';
      case 'sauce':
        return 'Соусы';
      case 'main':
        return 'Начинки';
      default:
        return 'UFO';
    }
  }

  return (
    <div>
      <h2>{getHeading(burgerpart[0].type)}</h2>
      <div className={styles.partsContainer}>
        {burgerpart.map((item) => (
          <div key={item._id}
            className={styles.partsItem}
            onClick={() => handleOpenModal(item)}>
            <img src={item.image} alt={item.name} />
            <div className={styles.priceContainer}>
              <p>{item.price}</p>
              <img src={subtract} alt={item.name} />
            </div>
            <div className={styles.nameContainer}>
              <p>{item.name}</p>
            </div>
            <Counter count={1} size="default" extraClass="m-1 counter" />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal header={"Детали ингредиента"} onClose={closeModal}>
          {currentIngredient && (<IngredientDetails currentIngredient={currentIngredient} />)}
        </Modal>
      )}
    </div>
  );
}

// проверяю типы 
BurgerParts.propTypes = {
  burgerpart: burgerPartShape
};

export default BurgerParts;