import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../services/actions/actions';
import { fetchOrder, clearCurrentOrder } from '../../services/actions/currentOrderActions';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import styles from './OrderDetailsPage.module.css';

const OrderDetailsPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const currentOrder = useSelector((state: RootState) =>
    state.ws.orders?.orders.find(order => order.number === Number(number)) || null
  );

  const { orderDetails, loading, error } = useSelector((state: RootState) => state.currentOrder);

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
