import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import styles from './OrderHistory.module.css';
import { WSConnectAction, WSDisconnectAction } from '../../services/actions/wsActions';
import { TResponseData, IOrderHistory, IIngredient } from '../../utils/types';
import OrderCard from '../../components/OrderCard/OrderCard'


const OrderHistory: React.FC = () => {
    const dispatch = useAppDispatch();
    const ordersData = useAppSelector((state) => state.ws.orders) as TResponseData;
    const ingredients = useAppSelector((state) => state.ingredients.ingredients) as IIngredient[];
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken) {
            dispatch(WSConnectAction(accessToken, ''));
        }
        return () => {
            dispatch(WSDisconnectAction()); // Закрываю соединение при размонтировании компонента
        };
    }, [dispatch, accessToken]);

    if (ordersData.orders.length === 0) {
        return <><div className={styles.spinner}></div><div>Loading orders...</div></>;
    }

    return (
        <div className={styles.orderHistory}>
            <div >
                {ordersData.orders.map((order: IOrderHistory) => (
                    <OrderCard key={order._id} order={order} ingredients={ingredients} />
                ))}
            </div>
        </div>
    );
};


export default OrderHistory;
