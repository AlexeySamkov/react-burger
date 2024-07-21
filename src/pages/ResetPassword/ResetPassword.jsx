import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {
    const navigate = useNavigate();
    
    // Создаем состояние для каждого поля ввода
    const [password, setPassword] = useState('');
    const [codeFromEmail, setCodeFromEmail] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCodeFromEmail(e.target.value);
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
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="off"
                />
            </div>
            <div className={styles.inputWrapper}>
                <Input
                    type="text"
                    name="codeFromEmail"
                    size="default"
                    placeholder="Введите код из письма"
                    value={codeFromEmail}
                    onChange={handleCodeChange}
                    autoComplete="off"
                />
            </div>

            <div className={styles.inputWrapper}>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
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
