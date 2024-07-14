import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/BurgerIngredients/IngredientDetails/IngredientDetails';
import styles from './IngredientDetailsPage.module.css';

const IngredientDetailsPage = () => {
  const { id } = useParams();
  const ingredient = useSelector(state =>
    state.ingredients.ingredients.find(item => item._id === id)
  );

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <div className={styles.modalBox}>
      <IngredientDetails  currentIngredient={ingredient} />
    </div>
  );
}

export default IngredientDetailsPage;
