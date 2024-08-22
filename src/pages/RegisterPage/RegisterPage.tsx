import React, { FormEvent} from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/authActions';
import styles from './RegisterPage.module.css';
import useForm from '../../hooks/useForm';

const RegisterPage = () => {
    const { values, handleChange } = useForm({ name: '', email: '', password: '' });
    const dispatch = useAppDispatch(); // Используем типизированный dispatch
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch(register(values.email, values.password, values.name));
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
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Input
                        type="email"
                        name="email"
                        size="default"
                        placeholder="E-mail"
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
                        value={values.password}
                        onChange={handleChange}
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
