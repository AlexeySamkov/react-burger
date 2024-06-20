import React from 'react';
import stylesBurgerConstructor from './BurgerConstructor.module.css'; 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import data from './../utils/data.json'

const BurgerConstructor = () => {

     // Фильтруем данные, выбирая только элементы с type "bun"
  const buns = data.filter(item => item.type === 'bun');


    return (
        <div className={stylesBurgerConstructor.burgerconstructor}>
        <div className={stylesBurgerConstructor.burgerHeader}>Соберите бургер</div>
        <div className={stylesBurgerConstructor.burgerTabs}>
           <Tab>Булки</Tab>
           <Tab>Соусы</Tab>
           <Tab>Начинки</Tab>
        </div>
        {buns.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <img src={item.image} alt={item.name} />
          <p>Price: {item.price}</p>
          <p>Proteins: {item.proteins}</p>
          <p>Fat: {item.fat}</p>
          <p>Carbohydrates: {item.carbohydrates}</p>
          <p>Calories: {item.calories}</p>
        </div>
          ))}
        </div>
    );
};

export default BurgerConstructor;