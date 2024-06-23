import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal'



const BurgerIngredients = ({ data }) => {

    const [isModal2Open, setIsModal2Open] = React.useState(false);

    const total = data.reduce((sum, ingredient) => sum + ingredient.price, 0); // сумма ингредиентов



    const handleOpenModal = () => {
        setIsModal2Open(true);
    }

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
                <Button
                    type="primary"
                    size="medium"
                    onClick={handleOpenModal}
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

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;
