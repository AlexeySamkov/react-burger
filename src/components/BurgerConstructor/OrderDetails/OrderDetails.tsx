import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';
import iconDone from '../../../images/graphicsiconDone.svg';
import { IOrder } from '../../../utils/types';

interface IOrderDetailsProps {
    order: IOrder | null;
  }

  const OrderDetails: React.FC<IOrderDetailsProps> = ({ order }) => {
    return (
        <div className={styles.orderDetails}>
            <div className={styles.orderNumber}>{order ? order.number : '...'}</div>
            <div className={styles.yourIdentifier}>идентификатор заказа</div>
            <div className={styles.image}>
                <img src={iconDone} alt="Order completed" />
            </div>
            <div className={styles.textBelow}>Ваш заказ начали готовить</div>
            <div className={styles.textBelow2}>Дождитесь готовности на орбитальной станции</div>
        </div>
    );
};

OrderDetails.propTypes = {
    order: PropTypes.shape({
        number: PropTypes.number.isRequired
    })
};

export default OrderDetails;
