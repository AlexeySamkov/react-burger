import React from 'react';
import stylesBurgerConstructor from './BurgerConstructor.module.css'; 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import data from './../utils/data.json'
import Buns from './Buns';

const BurgerConstructor = () => {




    return (
        <div className={stylesBurgerConstructor.burgerconstructor}>
        <div className={stylesBurgerConstructor.burgerHeader}>Соберите бургер</div>
        <div className={stylesBurgerConstructor.burgerTabs}>
           <Tab>Булки</Tab>
           <Tab>Соусы</Tab>
           <Tab>Начинки</Tab>
        </div>

        <Buns data={data}></Buns>
        </div>
    );
};

export default BurgerConstructor;