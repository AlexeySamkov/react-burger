import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerParts from './BurgerParts/BurgerParts';
import { burgerPartShape } from './../../utils/types';

const BurgerIngredients = ({ data }) => {


    const [current, setCurrent] = React.useState('bun')

    const buns = data.filter(item => item.type === 'bun');
    const sauce = data.filter(item => item.type === 'sauce');
    const main = data.filter(item => item.type === 'main');
    return (

        <div className={styles.burgerIngredients}>
            <div className={styles.burgerHeader}>Соберите бургер</div>
            <div className={styles.burgerTabs}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <div className={styles.burgerBox}>
                <BurgerParts burgerpart={buns} />
                <BurgerParts burgerpart={sauce} />
                <BurgerParts burgerpart={main} />
            </div>
        </div>
    );
};

// проверяю типы 
BurgerIngredients.propTypes = {
    data: burgerPartShape.isRequired
};

export default BurgerIngredients;
