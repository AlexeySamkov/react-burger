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
            <div className={styles.orderNumber}>{order ? order.number : <div className={styles.spinner}></div>}</div>
            <div className={styles.yourIdentifier}>{order ? <div>идентификатор заказа</div> : <div>подождите, идет оформление заказа...</div>}</div>
            <div className={styles.image}>
                <img src={iconDone} alt="Order completed" />
            </div>
            <div className={styles.textBelow}>{order ? <div>Ваш заказ начали готовить</div> : <div>Размещение заказа на сервере</div>}</div>
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
