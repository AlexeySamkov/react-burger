import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

interface ProtectedRouteElementProps {
    element: React.ReactElement;
    anonymous?: boolean;
  }
  

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element, anonymous = false }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    
    // console.log("ProtectedRouteElement: from =" + from );
    // console.log("ProtectedRouteElement: location.pathname =" + location.pathname );
    

    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isAuthenticated) {
        // ...то отправляем его на предыдущую страницу
        // console.log('Пользователь аутентифицирован, перенаправлен на:', from);
        return <Navigate to={from} />;
    }
    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isAuthenticated) {
        // ...то отправляем его на страницу логина
        // console.log('Пользователь не аутентифицирован, перенаправлен на /login');
        return <Navigate to="/login" state={{ from: location }} />;
    }
    // Если все ок, то рендерим внутреннее содержимое
    return element;
};

export default ProtectedRouteElement;
