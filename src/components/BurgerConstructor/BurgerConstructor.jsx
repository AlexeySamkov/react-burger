import React from 'react';
import styles from './BurgerConstructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal'
import { ingredientsShape } from './../../utils/types';

const BurgerConstructor = ({ data }) => {
    const [isModal2Open, setIsModal2Open] = React.useState(false);
    const everythingExceptBuns = data.filter(item => item.type !== 'bun');
    const total = everythingExceptBuns.reduce((sum, ingredient) => sum + ingredient.price, 0); // сумма ингредиентов
    const handleOpenModal = () => {
        setIsModal2Open(true);
    }

    return (
        <div className={styles.burgerConstructor}>
            <div className={styles.topBun}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </div>

            <div className={styles.container}>
                {everythingExceptBuns.map((ingredient) => (
                    <div key={ingredient._id} >
                        <DragIcon type="primary" />
                        <ConstructorElement
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            text={ingredient.name}
                        >
                        </ConstructorElement>
                    </div>
                ))}
            </div>
            <div className={styles.downBun}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </div>

            <div className={styles.orderSection}>
                <div className={styles.totalPrice}>
                    <p>{total}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    type="primary"
                    size="medium"
                    onClick={handleOpenModal}
                    htmlType="button"
                >
                    Оформить заказ
                </Button>
            </div>
            <Modal header="Ваш заказ" isOpen={isModal2Open} onClose={() => setIsModal2Open(false)}>
                <div className={styles.orderNumber}>
                    034536
                </div>
                <p>На сумму {total} Btc</p>
            </Modal>
        </div>
    );
}

// проверяю типы 
BurgerConstructor.propTypes = {
    data: ingredientsShape.isRequired
};

export default BurgerConstructor;