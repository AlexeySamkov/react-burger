import React from 'react';
import stylesBurgerConstructor from './BurgerConstructor.module.css'; 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import data from './../utils/data.json'
import Buns from './Buns';
import Sauces from './Sauces';
import Ingredients from './Ingredients';


const BurgerConstructor = () => {

    const [current, setCurrent] = React.useState('one')

    return (
        <div className={stylesBurgerConstructor.burgerconstructor}>
        <div className={stylesBurgerConstructor.burgerHeader}>Соберите бургер</div>
        <div className={stylesBurgerConstructor.burgerTabs}>
           <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
           <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
           <Tab value="ingredients" active={current === 'ingredients'} onClick={setCurrent}>Начинки</Tab>
        </div>

        <div className={stylesBurgerConstructor.burgerBox}>
            <Buns data={data}></Buns>
            <Sauces data={data}></Sauces>
            <Ingredients data={data}></Ingredients>
        </div>
        </div>
    );
};

export default BurgerConstructor;