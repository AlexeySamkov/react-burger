import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordConfirm } from '../../services/actions/passwordActions';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleResetPassword = async () => {
     dispatch(resetPasswordConfirm(password, token));
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <section className={styles.section}>
            <h2> Восстановление пароля </h2>
            <div className={styles.inputWrapper}>
                <Input
                    type="password"
                    name="password"
                    size="default"
                    placeholder="Введите новый пароль"
                    icon="ShowIcon"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Input
                    type="text"
                    name="token"
                    size="default"
                    placeholder="Введите код из письма"
                    autoComplete="off"
                    value={token}
                    onChange={handleTokenChange}
                />
            </div>

            <div className={styles.inputWrapper}>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleResetPassword}>
                    Сохранить
                </Button>
            </div>
            <div className={styles.othWrapper}>
                <p className={styles.paragraph}>Вспомнили пароль? <Button htmlType="button" type="secondary" size="small" onClick={handleLogin} >Войти</Button> </p>
            </div>
        </section>
    )
}

export default ResetPassword;
