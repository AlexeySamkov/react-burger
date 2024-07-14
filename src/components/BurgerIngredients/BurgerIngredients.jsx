import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/currentIngredientActions';
import BurgerParts from './BurgerParts/BurgerParts';


const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.ingredients);
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const handleIngredientClick = (item) => {
        dispatch(setCurrentIngredient(item));
        navigate(`/ingredients/${item._id}`, { state: { background: location } });
    };
    // { state: { background: location } }:
    // Это объект состояния, который будет передан вместе с навигацией. Он используется для передачи дополнительной информации в новый маршрут.
    // В данном случае, передается состояние с ключом background, значение которого равно текущему объекту location.
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

    // При монтировании компонента, useEffect    
    // Получает текущий элемент через containerRef.current.
    // Добавляет к этому элементу обработчик события scroll, который вызывает функцию handleScroll при прокрутке.
    // Когда компонент размонтируется, useEffect вызовет функцию очистки, возвращаемую функцией-побочным эффектом.
    // Удаляет обработчик события scroll из элемента, на который указывает containerRef.
    // такая конструкция во избежание утечек памяти, т.к. скролл может вызываться много раз, 

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleIngredientClick} />
                        ))}
                    </div>
                </div>
                <div ref={sauceRef}>
                    <h2>Соусы</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter(item => item.type === 'sauce').map((item) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleIngredientClick} />
                        ))}
                    </div>
                </div>
                <div ref={mainRef}>
                    <h2>Начинки</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter(item => item.type === 'main').map((item) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleIngredientClick} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerIngredients;
