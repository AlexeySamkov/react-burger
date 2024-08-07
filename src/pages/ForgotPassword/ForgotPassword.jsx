import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/passwordActions';
import useForm from '../../hooks/useForm';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ email: '' });

    const handleResetPassword = async (e) => {
        e.preventDefault();
        dispatch(resetPassword(values.email));
        navigate('/reset-password');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <section className={styles.section}>
            <h2> Восстановление пароля </h2>
            <form onSubmit={handleResetPassword}>
                <div className={styles.inputWrapper}>
                    <Input
                        type="email"
                        name="email"
                        size="default"
                        placeholder="укажите e-mail"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
                        Восстановить
                    </Button>
                </div>
            </form>
            <div className={styles.othWrapper}>
                <p className={styles.paragraph}>Вспомнили пароль? <Button htmlType="button" type="secondary" size="small" onClick={handleLogin}>Войти</Button> </p>
            </div>
        </section>
    )
}

export default ForgotPassword;
