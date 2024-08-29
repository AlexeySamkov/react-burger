import React, { useEffect, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../services/hooks';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateUser } from '../../services/actions/userActions';
import { logout } from '../../services/actions/authActions';
import styles from './Profile.module.css';
import useForm from '../../hooks/useForm';
import { IProfileFormValues } from '../../utils/types'
import { RootState } from '../../services/actions/actions'
import OrderHistory from '../OrderHistory/OrderHistory'

interface IProfileContentProps {
    values: IProfileFormValues;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: (e: FormEvent<HTMLFormElement>) => void;
}

const Profile: React.FC = () => {
    const dispatch = useAppDispatch(); // Используем типизированный dispatch
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });

    useEffect(() => {
        if (user) {
            setValues({ name: user.name, email: user.email, password: '' });
        }
    }, [user, setValues]);

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser({ name: values.name, email: values.email, password: values.password }));
    };

    const handleLogout = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await dispatch(logout());
        navigate('/login');
    };


    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.emptyDiv} />
                <NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/profile" end>
                    Профиль
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/profile/order-history">
                    История заказов
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/login" onClick={handleLogout}>
                    Выход
                </NavLink>
            </div>
            <div className={`${styles.content}`}>
                <Routes>
                    <Route path="/" element={<ProfileContent values={values} handleChange={handleChange} onSave={handleSave} />} />
                    <Route path="order-history" element={<OrderHistory />} />
                </Routes>
            </div>
        </div>
    );
};

const ProfileContent: React.FC<IProfileContentProps> = ({ values, handleChange, onSave }) => (
    <form onSubmit={onSave}>
        <div className={styles.inputs}>
            <div className={styles.emptyDiv} />
            <Input type="text" name="name" size="default" placeholder="Имя" value={values.name} onChange={handleChange} />
            <Input type="text" name="email" size="default" placeholder="Логин" value={values.email} onChange={handleChange} />
            <Input type="password" name="password" size="default" placeholder="Пароль" value={values.password} onChange={handleChange} />
            <div >
                <Button htmlType="submit" type="primary" size="small">
                    Сохранить
                </Button>
            </div>
        </div>

    </form>
);



export default Profile;
