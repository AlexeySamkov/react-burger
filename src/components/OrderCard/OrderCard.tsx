import React, { useMemo } from 'react';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderCardProps } from '../../utils/types';
import styles from './OrderCard.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentOrder } from '../../services/actions/currentOrderActions';
import { useAppDispatch } from '../../services/hooks';

const OrderCard: React.FC<IOrderCardProps> = ({ order, ingredients }) => {
    const navigate = useNavigate();
    const orderTime = new Date(order.createdAt);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleCardClick = () => {
        dispatch(setCurrentOrder(order.number));
        if (location.pathname.startsWith('/feed')) {
            navigate(`/feed/${order.number}`, { state: { background: location } });
        } else if (location.pathname.startsWith('/profile/orders')) {
            navigate(`/profile/orders/${order.number}`, { state: { background: location } });
        }
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

    const ingredientMap = useMemo(() => {
        const map = new Map();
        ingredients.forEach(ing => {
            map.set(ing._id, ing);
        });
        return map;
    }, [ingredients]);

    const calculateOrderTotal = () => {
        return order.ingredients.reduce((total, ingredientId) => {
            const ingredient = ingredientMap.get(ingredientId);
            return ingredient ? total + ingredient.price : total;
        }, 0);
    };

    const maxDisplayedIngredients = 5; // Максимальное количество отображаемых ингредиентов
    const hiddenIngredientsCount = order.ingredients.length - maxDisplayedIngredients;

    return (
        <div className={styles.orderCard} onClick={handleCardClick}>
            <div className={styles.orderHeader}>
                <span className={styles.orderNumber}>#{order.number}</span>
                <span className={styles.orderDate}><FormattedDate date={orderTime} /></span>
            </div>
            <div className={styles.orderName}>{order.name}</div>
            <div className={styles.orderStatus}>{translateStatus(order.status)}</div>
            <div className={styles.ingredients}>
                {order.ingredients.slice(0, maxDisplayedIngredients).map((ingredientId, index) => {
                    const ingredient = ingredientMap.get(ingredientId);
                    if (!ingredient) return null;
                    return (
                        <div
                            key={index}
                            className={styles.ingredient}
                            style={{ zIndex: maxDisplayedIngredients - index }}
                        >
                            <img src={ingredient.image_mobile} alt={ingredient.name} />
                        </div>
                    );
                })}
                {hiddenIngredientsCount > 0 && (
                    <div className={styles.ingredient}>
                        <span className={styles.hiddenCount}>+{hiddenIngredientsCount}</span>
                    </div>
                )}
                <div className={styles.orderTotal}>
                    <span className={styles.totalAmount}>{calculateOrderTotal()}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
