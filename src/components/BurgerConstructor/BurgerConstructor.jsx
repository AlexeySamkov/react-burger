import React from 'react';
import PropTypes from 'prop-types';
import stylesBurgerConstructor from './BurgerConstructor.module.css'; 
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerParts from './BurgerParts/BurgerParts';


const BurgerConstructor = ( {data} ) => {

    const [current, setCurrent] = React.useState('bun')

    const buns = data.filter(item => item.type === 'bun');
    const sauce = data.filter(item => item.type === 'sauce');
    const main = data.filter(item => item.type === 'main');

    

    return (
 
        <div className={stylesBurgerConstructor.burgerconstructor}>
        <div className={stylesBurgerConstructor.burgerHeader}>Соберите бургер</div>
        <div className={stylesBurgerConstructor.burgerTabs}>
           <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
           <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
           <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
        </div>

        <div className={stylesBurgerConstructor.burgerBox}>
            <BurgerParts burgerpart={buns} /> 
            <BurgerParts burgerpart={sauce} />
            <BurgerParts burgerpart={main} />
        </div>
        </div>
    );
};

// проверяю типы 

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
      })
    ).isRequired
  };

export default BurgerConstructor;