import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';



const BurgerIngredients = ({ data }) => {

    const total = data.reduce((sum, ingredient) => sum + ingredient.price, 0); // сумма ингредиентов
    return (
        <div className={styles.burgeringredients}>


            <div>
                <DragIcon type="primary" />
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </div>


            <div className={styles.container}>



                {data.map((ingredient) => (
                    <div className={styles.boxConstructorElement}>
                        <DragIcon type="primary" />
                        <ConstructorElement key={ingredient._id}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            text={ingredient.name}
                        >
                        </ConstructorElement>
                    </div>
                ))}


            </div>

            <div className={styles.downBun}>
                <DragIcon type="primary" />
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
                <p></p>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>

        </div>

    );

}

export default BurgerIngredients;
