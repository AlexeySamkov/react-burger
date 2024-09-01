import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/actions/actions';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

const OrderDetailsPage: React.FC = () => {
  
  
  const orders = useSelector((state: RootState) => state.ws.orders?.orders || []);  
  const currentOrderNumber = useSelector((state: RootState) => state.currentOrder.currentOrder);
  const order = orders.find((order) => order.number=== currentOrderNumber);

  if (!order) {
    return <h2>Заказ не найден</h2>;
  }

  return <OrderDetails />;
};

export default OrderDetailsPage;
