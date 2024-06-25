import React from 'react';
import styles from './OrderDetails.module.css';
import iconDone from '../../../images/graphicsiconDone.svg'

const OrderDetails = () => {
    return (
        <div className={styles.orderDetails}>
            <div className={styles.orderNumber}>034536</div>
            <div className={styles.yourIdentifier}>идентификатор заказа</div>
            <div className={styles.image}>
                <img src={iconDone} alt="" />
            </div>
            <div className={styles.textBelow}>Ваш заказ начали готовить</div>
            <div className={styles.textBelow2}>Дождитесь готовности на орбитальной станции</div>
        </div>
    )

}


export default OrderDetails;