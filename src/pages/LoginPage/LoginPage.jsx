import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/authActions';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login(email, password));
      navigate('/');
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section className={styles.section}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Input
            type="email"
            name="email"
            size="default"
            placeholder="E-mail"
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
            value={password}
            onChange={handlePasswordChange}
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
