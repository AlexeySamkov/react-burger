
import { Link } from 'react-router-dom';
import stylesAppHeader from "./AppHeader.module.css"; 
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';

const AppHeader = () => {

        // Создаем отдельное состояние для каждой иконки
        const [isBurgerHovered, setIsBurgerHovered] = useState(false);
        const [isListHovered, setIsListHovered] = useState(false);
        const [isProfileHovered, setIsProfileHovered] = useState(false);


    return (
        <header className={stylesAppHeader.header}>
            <div className={stylesAppHeader.section}>
            <Link                     
                    className={stylesAppHeader.link}
                    to="/constructor"
                    onMouseEnter={() => setIsBurgerHovered(true)} // Устанавливаем isHovered в true, когда мышь наводится на элемент
                    onMouseLeave={() => setIsBurgerHovered(false)} // Устанавливаем isHovered в false, когда мышь покидает элемент
                >
                    <span className={stylesAppHeader.icon}>
                    {isBurgerHovered ? <BurgerIcon type="primary"/> : <BurgerIcon type="secondary"/>}
                    </span>
                    Конструктор
                </Link>
                <Link 
                    className={stylesAppHeader.link} 
                    to="/orders"
                    onMouseEnter={() => setIsListHovered(true)} // Устанавливаем isHovered в true, когда мышь наводится на элемент
                    onMouseLeave={() => setIsListHovered(false)} // Устанавливаем isHovered в false, когда мышь покидает элемент
                >    
                <span className={stylesAppHeader.icon}>
                    {isListHovered ? <ListIcon type="primary"/> : <ListIcon type="secondary"/>}
                    </span>                
                    Лента заказов
                </Link>
            </div>
            <div className={stylesAppHeader.section}>
                <Link to="/" >
                    <Logo />
                </Link>
            </div>
            
            <div className={stylesAppHeader.section}>
            <Link 
                    className={stylesAppHeader.link} 
                    to="/orders"
                    onMouseEnter={() => setIsProfileHovered(true)} // Устанавливаем isHovered в true, когда мышь наводится на элемент
                    onMouseLeave={() => setIsProfileHovered(false)} // Устанавливаем isHovered в false, когда мышь покидает элемент
                >  
                <span className={stylesAppHeader.icon}>
                    {isProfileHovered ? <ProfileIcon type="primary"/> : <ProfileIcon type="secondary"/>}  
                    </span>                                                
                    Личный кабинет
                </Link>
            </div>
        </header>
    );
};

export default AppHeader;
