import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/authActions';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
    const handleLogin = async () => {
        console.log('Попытка залогиниться с email:', email);
        try {
        dispatch(login(email, password));
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
            <div className={styles.inputWrapper}>
                <Input
                    type="email"
                    name="email"
                    size="default"
                    placeholder="E-mail"
                    autoComplete="off"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Input
                    type="password"
                    name="password"
                    size="default"
                    placeholder="Пароль"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleLogin}>
                    Войти
                </Button>
            </div>
        </section>
    );
};

export default LoginPage;
