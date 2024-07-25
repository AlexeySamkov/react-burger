import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/passwordActions';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async () => {
        dispatch(resetPassword(email));
        navigate('/reset-password');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <section className={styles.section}>
            <h2> Восстановление пароля </h2>
            <div className={styles.inputWrapper}>
                <Input
                    type="email"
                    name="email"
                    size="default"
                    placeholder="укажите e-mail"
                    autoComplete="off"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
          
            <div className={styles.inputWrapper}>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleResetPassword}>
                    Восстановить
                </Button>
            </div>
            <div className={styles.othWrapper}>
                <p className={styles.paragraph}>Вспомнили пароль? <Button htmlType="button" type="secondary" size="small" onClick={handleLogin} >Войти</Button> </p>
            </div>
        </section>
    )
}

export default ForgotPassword;
