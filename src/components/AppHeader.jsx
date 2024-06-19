import React from 'react';
// import { Link } from 'react-router-dom';
import './AppHeader.css'; 

const AppHeader = () => {
    return (
        <header className="app-header">
            <Link to="/constructor" className="header-button">
                Конструктор
            </Link>
            <Link to="/orders" className="header-icon">
                <img src="/path/to/orders-icon.png" alt="Лента заказов" /> {/* Замените на путь к вашей иконке */}
            </Link>
            <Link to="/" className="header-logo">
                <img src="/path/to/logo.png" alt="Логотип" /> {/* Замените на путь к вашему логотипу */}
            </Link>
            <Link to="/profile" className="header-button">
                Личный кабинет
            </Link>
        </header>
    );
};

export default AppHeader;
