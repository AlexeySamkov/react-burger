import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { fetchOrder, clearCurrentOrder } from '../../services/actions/currentOrderActions';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import styles from './OrderDetailsPage.module.css';

const OrderDetailsPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  const currentOrder = useAppSelector((state) =>
    state.ws.orders?.orders.find(order => order.number === Number(number)) || null
  );

  const { orderDetails, loading, error } = useAppSelector((state) => state.currentOrder);

  useEffect(() => {
    if (number && !currentOrder) {
      dispatch(fetchOrder(Number(number)));
    }

    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, number, currentOrder]);

  let content;
  if (loading) {
    content = <p>Загрузка заказа...</p>;
  } else if (error) {
    content = <p>Ошибка: {error}</p>;
  } else if (currentOrder || orderDetails) {
    content = <OrderDetails currentOrder={currentOrder || orderDetails} />;
  } else {
    content = <h2>Заказ не найден</h2>;
  }

  return <div className={styles.centeredContainer}>{content}</div>;
};

export default OrderDetailsPage;
