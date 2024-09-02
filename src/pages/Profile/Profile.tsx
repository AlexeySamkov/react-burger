import React, { useEffect, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { logout } from '../../services/actions/authActions';
import { getUser } from '../../services/actions/userActions';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            dispatch(getUser());
        }
    }, [dispatch, user]);

    const handleLogout = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.emptyDiv} />
                <NavLink
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    to="/profile"
                    end
                >
                    Профиль
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    to="/profile/orders"
                >
                    История заказов
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    to="/logout"
                    onClick={handleLogout}
                >
                    Выход
                </NavLink>
            </div>
            <div className={styles.content}>
                <Outlet />
                {/* <Routes>
                    <Route path="/" element={<ProfileContent />} />
                    <Route path="orders" element={<OrderHistory />} />
                </Routes> */}
            </div>
        </div>
    );
};

export default Profile;
