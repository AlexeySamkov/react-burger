import React from 'react';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderCardProps } from '../../utils/types';
import styles from './OrderCard.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentOrder } from '../../services/actions/currentOrderActions'
import { useAppDispatch } from '../../services/hooks';

const OrderCard: React.FC<IOrderCardProps> = ({ order, ingredients }) => {

    const navigate = useNavigate();
    const orderTime = new Date(order.createdAt);
    const location = useLocation();
    const dispatch = useAppDispatch();


    const handleCardClick = () => {
        dispatch(setCurrentOrder(order.number)); 
        navigate(`/feed/${order.number}`, { state: { background: location } });
    };

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
        <div className={styles.orderCard} onClick={handleCardClick}>
            <div className={styles.orderHeader}>
                <span className={styles.orderNumber} >#{order.number}</span>
                <span className={styles.orderDate}><FormattedDate date={orderTime} /></span>

            </div>
            <div className={styles.orderName}>{order.name}</div>
            <div className={styles.orderStatus}>{translateStatus(order.status)}</div>
            <div className={styles.ingredients}>
                {order.ingredients.map((ingredientId, index) => {
                    const { image, name } = getIngredientDetails(ingredientId);
                    return (
                        <div
                            key={index}
                            className={styles.ingredient}
                            style={{ zIndex: order.ingredients.length - index }}
                        >
                            <img src={image} alt={name} />
                        </div>
                    );
                })}
                <div className={styles.orderTotal}>
                    <span className={styles.totalAmount}>{calculateOrderTotal()}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    );
};

export default OrderCard;