import React from 'react';
import styles from './BurgerParts.module.css';
import subtract from './../../../images/subtract.svg'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from './../../Modal/Modal'
import { ingredientsShape } from './../../../utils/types';

const BurgerParts = ({ burgerpart }) => {
  const [isModal1Open, setIsModal1Open] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);


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

  const handleOpenModal = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsModal1Open(true);
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
      {isModal1Open && (
        <Modal header={"Детали ингредиента"} isOpen={isModal1Open} onClose={() => setIsModal1Open(false)}>
          {currentIngredient && (
            <div className={styles.modalContent}>
              <img src={currentIngredient.image_large} alt={currentIngredient.name} className={styles.modalImage} />
              <h3 className={styles.modalName}>{currentIngredient.name}</h3>
              <div className={styles.modalNutrition}>
                <div className={styles.modalNutritionItem}>
                  <p>Калории, ккал {currentIngredient.calories}</p>
                </div>
                <div className={styles.modalNutritionItem}>
                  <p>Белки, г {currentIngredient.proteins}</p>
                </div>
                <div className={styles.modalNutritionItem}>
                  <p>Жиры, г {currentIngredient.fat}</p>
                </div>
                <div className={styles.modalNutritionItem}>
                  <p>Углеводы, г {currentIngredient.carbohydrates}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// проверяю типы 

BurgerParts.propTypes = {
  burgerpart: ingredientsShape
};



export default BurgerParts;