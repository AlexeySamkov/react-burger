import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordConfirm } from '../../services/actions/passwordActions';
import useForm from '../../hooks/useForm';
import { useAppDispatch } from '../../hooks/hooks';

const ResetPassword = () => {
    const dispatch = useAppDispatch(); // Используем типизированный dispatch
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ password: '', token: '' });

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(resetPasswordConfirm(values.password, values.token));
        navigate('/login');
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
                        type="password"
                        name="password"
                        size="default"
                        placeholder="Введите новый пароль"
                        icon="ShowIcon"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Input
                        type="text"
                        name="token"
                        size="default"
                        placeholder="Введите код из письма"
                        autoComplete="off"
                        value={values.token}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
                        Сохранить
                    </Button>
                </div>
            </form>
            <div className={styles.othWrapper}>
                <p className={styles.paragraph}>Вспомнили пароль? <Button htmlType="button" type="secondary" size="small" onClick={handleLogin} >Войти</Button> </p>
            </div>
        </section>
    )
}

export default ResetPassword;