import React from 'react';
import styles from './IngredientDetails.module.css';
import { ingredientsShape } from './../../../utils/types';

const IngredientDetails = ({ currentIngredient }) => {
    return (
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
    )
};

// проверяю типы 
IngredientDetails.propTypes = {
    currentIngredient: ingredientsShape.isRequired
};



export default IngredientDetails;    