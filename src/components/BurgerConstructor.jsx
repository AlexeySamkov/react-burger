import React from 'react';
import stylesBurgerConstructor from './BurgerConstructor.module.css'; 

const BurgerConstructor = () => {
    return (
        <div className={stylesBurgerConstructor.burgerconstructor}>
            <h2>Constructor</h2>
            {/* Здесь будет код для отображения конструктора бургера */}
        </div>
    );
};

export default BurgerConstructor;