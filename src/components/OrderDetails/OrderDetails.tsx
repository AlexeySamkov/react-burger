import React from 'react';
import styles from './OrderDetails.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/actions/actions';


const OrderDetails = () => {

    const orders = useSelector((state: RootState) => state.ws.orders?.orders || []);
    const currentOrderNumber = useSelector((state: RootState) => state.currentOrder.currentOrder);
    const currentOrder = orders.find((order) => order.number === currentOrderNumber);
    const { ingredients } = useSelector((state: RootState) => state.ingredients);
    
    if (!currentOrder) {
        return <p>Заказ не найден</p>; 
    }

    const orderTime = new Date(currentOrder.createdAt);
    


    const translateStatus = (status: string): string => {
        switch (status) {
            case 'created':
                return 'Создан';
            case 'pending':
                return 'В процессе';
            case 'done':
                return 'Выполнен';
            default:
                return 'Неизвестен';
        }
    };

    const getIngredientDetails = (ingredientId: string) => {
        const ingredient = ingredients.find(ing => ing._id === ingredientId);
        if (ingredient) {
            return {
                image: ingredient.image_mobile,
                name: ingredient.name,
            };
        }
        return {
            image: '',
            name: 'Unknown ingredient',
        };
    };

    const calculateOrderTotal = () => {
        return currentOrder.ingredients.reduce((total, ingredientId) => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId);
            return ingredient ? total + ingredient.price : total;
        }, 0);
    };

    return (
        <div className={styles.orderDetails}>
            {/* <h2>Заказ #{order.number}</h2> */}
            <div className={styles.orderInfo}>
                <span>{translateStatus(currentOrder.status)}</span>
            </div>
            <div className={styles.ingredientsList}>
                {currentOrder.ingredients.map((ingredientId, index) => {
                    const { image, name } = getIngredientDetails(ingredientId);
                    return (
                        <div key={index} className={styles.ingredient}>
                            <img src={image} alt={name} />
                            <span>{name}</span>
                        </div>
                    );
                })}
            </div>

            <div className={styles.lastRow}>
                <FormattedDate date={orderTime} />
                <div className={styles.totalPrice}>
                    <p>{calculateOrderTotal()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
