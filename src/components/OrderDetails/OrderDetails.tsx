import React from 'react';
import { useSelector } from 'react-redux';
import styles from './OrderDetails.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderHistory } from '../../utils/types';
import type { RootState } from '../../services/actions/actions';

interface OrderDetailsProps {
    currentOrder: IOrderHistory | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ currentOrder }) => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients);
    const currentOrderNumber = useSelector((state: RootState) => state.currentOrder.currentOrder);

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
        return ingredient
            ? { image: ingredient.image_mobile, name: ingredient.name, price: ingredient.price }
            : { image: '', name: 'Unknown ingredient', price: 0 };
    };

    const calculateOrderTotal = () => {
        return currentOrder.ingredients.reduce((total, ingredientId) => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId);
            return ingredient ? total + ingredient.price : total;
        }, 0);
    };

    const ingredientCounts = currentOrder.ingredients.reduce((counts: { [id: string]: number }, ingredientId) => {
        counts[ingredientId] = (counts[ingredientId] || 0) + 1;
        return counts;
    }, {});

    return (
        <div className={styles.orderDetails}>
            {currentOrderNumber == null && (
                <div className={styles.orderHeader}>#{currentOrder.number} </div>
            )}
            <div className={styles.orderName}> {currentOrder.name} </div>

            <div className={styles.orderStatus}>{translateStatus(currentOrder.status)}</div>
            <div className={styles.ingredientsHeader}>Состав:</div>
            <div className={styles.ingredientsList}>
                {Object.keys(ingredientCounts).map((ingredientId, index) => {
                    const { image, name, price } = getIngredientDetails(ingredientId);
                    const count = ingredientCounts[ingredientId];
                    return (
                        <div key={index} className={styles.ingredientRow}>
                            <div className={styles.ingredient}>
                                <img src={image} alt={name} />
                            </div>
                            <span className={styles.ingredientName}>{name}</span>
                            <span className={styles.ingredientPrice}>
                                {count} x {price} <CurrencyIcon type="primary" />
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className={styles.footer}>
                <FormattedDate className={styles.orderDate} date={orderTime} />
                <div className={styles.totalPrice}>
                    <p className={styles.totalAmount}>{calculateOrderTotal()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
