import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateUser } from '../../services/actions/userActions';
import { logout } from '../../services/actions/authActions';
import styles from './Profile.module.css';
import useForm from '../../hooks/useForm';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });

    useEffect(() => {
        if (user) {
            setValues({ name: user.name, email: user.email, password: '' });
        }
    }, [user, setValues]);

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateUser({ name: values.name, email: values.email, password: values.password }));
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/profile" end>
                    Профиль
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/profile/order-history">
                    История заказов
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    to="/login"
                    onClick={handleLogout}
                >
                    Выход
                </NavLink>
            </div>
            <div className={styles.content}>
                <Routes>
                    <Route path="/" element={<ProfileContent values={values} handleChange={handleChange} onSave={handleSave} />} />
                    <Route path="order-history" element={<OrderHistory />} />
                </Routes>
            </div>
        </div>
    );
};

const ProfileContent = ({ values, handleChange, onSave }) => (
    <form onSubmit={onSave}>
        <div className={styles.inputs}>
            <Input type="text" name="name" size="default" placeholder="Имя" value={values.name} onChange={handleChange} />
            <Input type="text" name="email" size="default" placeholder="Логин" value={values.email} onChange={handleChange} />
            <Input type="password" name="password" size="default" placeholder="Пароль" value={values.password} onChange={handleChange} />
        </div>
        <Button htmlType="submit" type="primary" size="small">
            Сохранить
        </Button>
    </form>
);

const OrderHistory = () => (
    <div>
        <h2>История заказов</h2>
    </div>
);

export default Profile;
