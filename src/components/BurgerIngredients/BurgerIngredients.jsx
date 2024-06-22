import React from 'react';
import stylesBurgerIngredients from './BurgerIngredients.module.css'; 


const BurgerIngredients = () => {
    return (
        <div className={stylesBurgerIngredients.burgeringredients}>
            <h2>Ingredients</h2>
            {/* Здесь будет код для отображения ингредиентов */}
        </div>
    );
};

export default BurgerIngredients;
