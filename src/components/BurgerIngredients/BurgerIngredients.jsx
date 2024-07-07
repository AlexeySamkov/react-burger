import { useState, useEffect, useRef } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from './../../hooks/useModal';
import { setCurrentIngredient, clearCurrentIngredient } from '../../services/actions/currentIngredientActions';
import BurgerParts from './BurgerParts/BurgerParts';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');
    const dispatch = useDispatch();
    const { ingredients, currentIngredient } = useSelector(state => state.ingredients);
    const { isModalOpen, openModal, closeModal } = useModal();

    const containerRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const handleOpenModal = (item) => {
        dispatch(setCurrentIngredient(item));
        openModal();
    };

    const handleCloseModal = () => {
        dispatch(clearCurrentIngredient());
        closeModal();
    };


    // Метод elem.getBoundingClientRect() возвращает координаты в контексте окна для минимального 
    // по размеру прямоугольника, который заключает в себе элемент elem, в виде объекта встроенного класса
    const handleScroll = () => {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const bunTop = bunRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current.getBoundingClientRect().top;
        const mainTop = mainRef.current.getBoundingClientRect().top;

        const offset = 50; // смещение для более точного определения видимости секций

        if (bunTop - containerTop < offset && sauceTop - containerTop >= offset) {
            setCurrent('bun');
        } else if (sauceTop - containerTop < offset && mainTop - containerTop >= offset) {
            setCurrent('sauce');
        } else if (mainTop - containerTop < offset) {
            setCurrent('main');
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // scrollIntoView: При клике на таб, соответствующая секция плавно прокручивается в видимую область.
    return (
        <div className={styles.burgerIngredients}>
            <div className={styles.burgerHeader}>Соберите бургер</div>
            <div className={styles.burgerTabs}>
                <Tab value="bun" active={current === 'bun'} onClick={() => bunRef.current.scrollIntoView({ behavior: 'smooth' })}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => sauceRef.current.scrollIntoView({ behavior: 'smooth' })}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => mainRef.current.scrollIntoView({ behavior: 'smooth' })}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.burgerBox} ref={containerRef} onScroll={handleScroll}>
                <div ref={bunRef}>
                    <h2>Булки</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter(item => item.type === 'bun').map((item) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleOpenModal} />
                        ))}
                    </div>
                </div>
                <div ref={sauceRef}>
                    <h2>Соусы</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter(item => item.type === 'sauce').map((item) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleOpenModal} />
                        ))}
                    </div>
                </div>
                <div ref={mainRef}>
                    <h2>Начинки</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter(item => item.type === 'main').map((item) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleOpenModal} />
                        ))}
                    </div>
                </div>
                {isModalOpen && (
                    <Modal header={"Детали ингредиента"} onClose={handleCloseModal}>
                        {currentIngredient && (<IngredientDetails currentIngredient={currentIngredient} />)}
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default BurgerIngredients;
