import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/authActions';
import styles from './LoginPage.module.css';
import useForm from '../../hooks/useForm';

const LoginPage = () => {
    const { values, handleChange } = useForm({ email: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Попытка залогиниться с email:', values.email);
        try {
            dispatch(login(values.email, values.password));
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    };

    const from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (isAuthenticated) {
            console.log('Пользователь аутентифицирован, переходит на:', from);
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <section className={styles.section}>
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.inputWrapper}>
                    <Input
                        type="email"
                        name="email"
                        size="default"
                        placeholder="E-mail"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Input
                        type="password"
                        name="password"
                        size="default"
                        placeholder="Пароль"
                        autoComplete="off"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
                        Войти
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
