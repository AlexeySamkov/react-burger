import React from 'react';
import styles from './Home.module.css';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';

const Home = () => {
  return (
    <div className={styles.Home}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
  );
}

export default Home;
