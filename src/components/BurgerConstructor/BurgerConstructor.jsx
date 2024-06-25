import React from 'react';
import styles from './BurgerConstructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal'
import { burgerPartShape } from './../../utils/types';
import OrderDetails from './OrderDetails/OrderDetails'

const BurgerConstructor = ({ data }) => {
    
    const [isModal2Open, setIsModal2Open] = React.useState(false);
    
    const everythingExceptBuns = data.filter(item => item.type !== 'bun');
    
    const total = everythingExceptBuns.reduce((sum, ingredient) => sum + ingredient.price, 0); // сумма ингредиентов
    
    const handleOpenModal = () => {
        setIsModal2Open(true);
    }
    
    const handleCloseModal = () => {
        setIsModal2Open(false);
    }

    return (
        <div className={styles.burgerConstructor}>
            <div className={styles.topBun}>
                <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
            </div>
            <div className={styles.container}>
                {everythingExceptBuns.map((ingredient) => (
                    <div key={ingredient._id} >
                        <DragIcon type="primary" />
                        <ConstructorElement price={ingredient.price} thumbnail={ingredient.image} text={ingredient.name} />
                    </div>
                ))}
            </div>
            <div className={styles.downBun}>
                <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
            </div>
            <div className={styles.orderSection}>
                <div className={styles.totalPrice}>
                    <p>{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal} htmlType="button" >
                    Оформить заказ
                </Button>
            </div>
            {isModal2Open && (
                <Modal header="Ваш заказ" onClose={handleCloseModal}>
                    <OrderDetails total={total} />
                </Modal>
            )}
        </div>

    );
}

// проверяю типы 
BurgerConstructor.propTypes = {
    data: burgerPartShape.isRequired
};

export default BurgerConstructor;