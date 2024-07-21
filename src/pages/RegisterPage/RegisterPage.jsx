import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/authActions';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(register(email, password, name));
      navigate('/');
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section className={styles.section}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            name="name"
            size="default"
            placeholder="Имя"
            value={name}
            onChange={handleNameChange}
          />
        </div>
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
