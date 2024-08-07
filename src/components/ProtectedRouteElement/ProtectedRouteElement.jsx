import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element, anonymous = false }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const location = useLocation();
    const from = location.state?.from || '/';

    console.log('Из ProtectedRouteElement - isAuthenticated:', isAuthenticated);

    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isAuthenticated) {
        // ...то отправляем его на предыдущую страницу
        console.log('Пользователь аутентифицирован, перенаправлен на:', from);
        return <Navigate to={from} />;
    }
    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isAuthenticated) {
        // ...то отправляем его на страницу логина
        console.log('Пользователь не аутентифицирован, перенаправлен на /login');
        return <Navigate to="/login" state={{ from: location }} />;
    }
    // Если все ок, то рендерим внутреннее содержимое
    return element;
};

export default ProtectedRouteElement;
