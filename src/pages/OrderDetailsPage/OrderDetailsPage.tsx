import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/actions/actions';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

const OrderDetailsPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  
  const orders = useSelector((state: RootState) => state.ws.orders?.orders || []);
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);

  const order = orders.find((order) => order.number.toString() === number);

  if (!order) {
    return <h2>Заказ не найден</h2>;
  }

  return <OrderDetails order={order} ingredients={ingredients} />;
};

export default OrderDetailsPage;
