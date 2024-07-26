import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateUser } from '../../services/actions/userActions';
import { logout } from '../../services/actions/authActions';
import styles from './Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSave = () => {
        dispatch(updateUser({ name, email, password }));
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
                    <Route path="/" element={<ProfileContent name={name} email={email} password={password} onNameChange={handleNameChange} onEmailChange={handleEmailChange} onPasswordChange={handlePasswordChange} onSave={handleSave} />} />
                    <Route path="order-history" element={<OrderHistory />} />
                </Routes>
            </div>
        </div>
    );
};

const ProfileContent = ({ name, email, password, onNameChange, onEmailChange, onPasswordChange, onSave }) => (
    <>
        <div className={styles.inputs}>
            <Input type="text" name="name" size="default" placeholder="Имя" value={name} onChange={onNameChange} />
            <Input type="text" name="email" size="default" placeholder="Логин" value={email} onChange={onEmailChange} />
            <Input type="password" name="password" size="default" placeholder="Пароль" value={password} onChange={onPasswordChange} />
        </div>
        <Button htmlType="button" type="primary" size="small" onClick={onSave}>
            Сохранить
        </Button>
    </>
);

const OrderHistory = () => (
    <div>
        <h2>История заказов</h2>
    </div>
);

export default Profile;
