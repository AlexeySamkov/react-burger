import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/BurgerIngredients/IngredientDetails/IngredientDetails';
import styles from './IngredientDetailsPage.module.css';
import { IIngredient } from '../../utils/types';
import { RootState } from '../../services/actions/actions'

const IngredientDetailsPage = () => {
  const { id } = useParams();
  const ingredient = useSelector((state: RootState) =>
    state.ingredients.ingredients.find((item: IIngredient) => item._id === id)
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
