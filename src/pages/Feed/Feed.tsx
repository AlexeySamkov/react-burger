import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import styles from './Feed.module.css';
import { WSConnectAction, WSDisconnectAction } from '../../services/actions/wsActions';
import { TResponseData, IOrderHistory, IIngredient } from '../../utils/types';
import OrderCard from '../../components/OrderCard/OrderCard'
import OrderStats from '../../components/OrderStats/OrderStats'; 


const Feed: React.FC = () => {
    const dispatch = useAppDispatch();
    const ordersData = useAppSelector((state) => state.ws.orders) as TResponseData;
    const ingredients = useAppSelector((state) => state.ingredients.ingredients) as IIngredient[];
    useEffect(() => {
        dispatch(WSConnectAction( '', '/all'));
        return () => {
            dispatch(WSDisconnectAction()); // Закрываем соединение при размонтировании компонента
        };
    }, [dispatch]);

    if (ordersData.orders.length === 0) {
        return <div className={styles.orderFeed}><div className={styles.spinner}></div></div>;
    }

    return (
        <div className={styles.orderFeed}>
            <div className={styles.orderFeed__column}>
                {ordersData.orders.map((order: IOrderHistory) => (
                    <OrderCard key={order._id} order={order} ingredients={ingredients} />
                ))}
            </div>
            <div className={styles.orderFeed__column}>
                <OrderStats/>
            </div>
        </div>
    );
};


export default Feed;
