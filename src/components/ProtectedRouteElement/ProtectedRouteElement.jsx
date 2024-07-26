import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const location = useLocation();

    console.log('Из ProtectedRouteElement - isAuthenticated:', isAuthenticated);
    // console.log('Из ProtectedRouteElement - location:', location);

    if (!isAuthenticated) {
         console.log('Пользователь не аутентифицирован, перенапрвлен на /login');
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRouteElement;
