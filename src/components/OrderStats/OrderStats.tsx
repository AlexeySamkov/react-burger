import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/actions/actions';
import styles from './OrderStats.module.css';

const OrderStats: React.FC = () => {
    const ordersData = useSelector((state: RootState) => state.ws.orders);

    if (!ordersData) {
        return null; // Если данных нет, компонент не будет рендериться
    }

    const sortedOrders = [...ordersData.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // ...ordersData.orders — Это оператор распространения (spread operator), который разворачивает элементы массива ordersData.orders.
    // [...ordersData.orders] — Создает новый массив, содержащий все элементы из исходного массива ordersData.orders.

    const completedOrders = sortedOrders
        .filter(order => order.status === 'done')
        .slice(0, 10);

    const pendingOrders = sortedOrders
        .filter(order => order.status === 'pending')
        .slice(0, 10);

    return (
        <div className={styles.orderStats}>
            {/* Первая строка: Готовые и в процессе заказы */}
            <div className={styles.first_row}>
                <div className={styles.column_in_first_row}>
                    <h3 className={styles.title}>Готовы:</h3>
                    <ul className={styles.orderList}>
                        {completedOrders.map(order => (
                            <li key={order._id} className={styles.orderItemDone}>{order.number}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column_in_first_row}>
                    <h3 className={styles.title}>В работе:</h3>
                    <ul className={styles.orderList}>
                        {pendingOrders.map(order => (
                            <li key={order._id} className={styles.orderItemInWork}>{order.number}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Вторая строка: Выполнено за все время */}
            <div className={styles.second_row}>
                <h3 className={styles.title}>Выполнено за все время</h3>
                <p className={styles.number}>{ordersData.total}</p>
            </div>

            {/* Третья строка: Выполнено сегодня */}
            <div className={styles.third_row}>
                <h3 className={styles.title}>Выполнено сегодня</h3>
                <p className={styles.number}>{ordersData.totalToday}</p>
            </div>
        </div>
    );
};

export default OrderStats;
