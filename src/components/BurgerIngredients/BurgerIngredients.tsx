import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/currentIngredientActions';
import BurgerParts from './BurgerParts/BurgerParts';
import { IIngredient } from '../../utils/types';


const BurgerIngredients: React.FC = () => {
    const [current, setCurrent] = useState<string>('bun');
    const dispatch: any = useDispatch();
    const { ingredients } = useSelector((state: any) => state.ingredients);
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const handleIngredientClick = (item: IIngredient) => {
        dispatch(setCurrentIngredient(item));
        navigate(`/ingredients/${item._id}`, { state: { background: location } });
    };
    // { state: { background: location } }:
    // Это объект состояния, который будет передан вместе с навигацией. Он используется для передачи дополнительной информации в новый маршрут.
    // В данном случае, передается состояние с ключом background, значение которого равно текущему объекту location.
    const handleScroll = () => {
        if (!containerRef.current || !bunRef.current || !sauceRef.current || !mainRef.current) return;

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
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className={styles.burgerIngredients}>
            <div className={styles.burgerHeader}>Соберите бургер</div>
            <div className={styles.burgerTabs}>
                <Tab value="bun" active={current === 'bun'} onClick={() => bunRef.current?.scrollIntoView({ behavior: 'smooth' })}>  {/*  Опциональная цепочка Если bunRef.current является null или undefined, то выражение завершится и вернет undefined, и метод scrollIntoView не будет вызван  */}
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => sauceRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => mainRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.burgerBox} ref={containerRef} onScroll={handleScroll}>
                <div ref={bunRef}>
                    <h2>Булки</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter((item: IIngredient) => item.type === 'bun').map((item: IIngredient & { counter: number }) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleIngredientClick} />
                        ))}
                    </div>
                </div>
                <div ref={sauceRef}>
                    <h2>Соусы</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter((item: IIngredient) => item.type === 'sauce').map((item: IIngredient & { counter: number }) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleIngredientClick} />
                        ))}
                    </div>
                </div>
                <div ref={mainRef}>
                    <h2>Начинки</h2>
                    <div className={styles.partsContainer}>
                        {ingredients.filter((item: IIngredient) => item.type === 'main').map((item: IIngredient & { counter: number }) => (
                            <BurgerParts key={item._id} item={item} handleOpenModal={handleIngredientClick} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerIngredients;
