import React from 'react';
import { Link } from 'react-router-dom';
import stylesAppHeader from "./AppHeader.module.css"; 
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={stylesAppHeader.header}>
            <div className={stylesAppHeader.section}>
                <Link className={stylesAppHeader.hdlink} to="/constructor">
                    <BurgerIcon type="primary"/>
                    <span className={stylesAppHeader.hdtext}>Конструктор</span>
                </Link>
                <Link className={stylesAppHeader.hdlink} to="/orders">
                    <ListIcon type="secondary" />
                    <span className={stylesAppHeader.hdtextinactive}>Лента заказов</span>
                </Link>
            </div>
            <div className={stylesAppHeader.section}>
                <Link to="/" >
                    <Logo />
                </Link>
            </div>
            
            <div className={stylesAppHeader.section}>
                <Link className={stylesAppHeader.hdlink} to="/profile">
                    <ProfileIcon type='secondary' />
                    <span className={stylesAppHeader.hdtextinactive}>Личный кабинет</span>
                </Link>
            </div>
        </header>
    );
};

export default AppHeader;
