import styles from './BurgerParts.module.css';
import subtract from './../../../images/subtract.svg';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsShape } from './../../../utils/types';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addIngredientToConstructor, removeAllBunsFromConstructor } from '../../../services/actions/ingredientConstructorActions';

const BurgerParts = ({ item, handleOpenModal }) => {
    const dispatch = useDispatch();
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id: item._id },
        end: (draggedItem, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.name === 'BurgerConstructor') {
                if (item.type === 'bun') {
                    // Удаляю все булки
                    dispatch(removeAllBunsFromConstructor());
                }
                // Добавляю новый ингредиент
                dispatch(addIngredientToConstructor(item));
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={dragRef} className={styles.partsItem} onClick={() => handleOpenModal(item)} style={{ opacity: isDragging ? 0.5 : 1 }} >
            <div className={styles.partsContainer}>
                <img src={item.image} alt={item.name} />
                <div className={styles.priceContainer}>
                    <p>{item.price}</p>
                    <img src={subtract} alt={item.name} />
                </div>
                <div className={styles.nameContainer}>
                    <p>{item.name}</p>
                </div>
                <Counter count={item.counter} size="default" extraClass="m-1 counter" />
            </div>
        </div>
    )
}

// проверяю типы 
BurgerParts.propTypes = {
    item: ingredientsShape
};

export default BurgerParts;