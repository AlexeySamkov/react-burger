import React from 'react';
import { IOrderCardProps } from '../../utils/types';
import styles from './OrderDetails.module.css'; 
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails: React.FC<IOrderCardProps> = ({ order, ingredients }) => {
    const orderTime = new Date(order.createdAt);

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
        return order.ingredients.reduce((total, ingredientId) => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId);
            return ingredient ? total + ingredient.price : total;
        }, 0);
    };

    return (
        <div className={styles.orderDetails}>
            <h2>Заказ #{order.number}</h2>
            <div className={styles.orderInfo}>
                <span>{translateStatus(order.status)}</span>
                <span><FormattedDate date={orderTime} /></span>
            </div>
            <div className={styles.ingredientsList}>
                {order.ingredients.map((ingredientId, index) => {
                    const { image, name } = getIngredientDetails(ingredientId);
                    return (
                        <div key={index} className={styles.ingredient}>
                            <img src={image} alt={name} />
                            <span>{name}</span>
                        </div>
                    );
                })}
            </div>
            <div className={styles.orderTotal}>
                <span>Сумма: {calculateOrderTotal()}</span>
            </div>
        </div>
    );
};

export default OrderDetails;
