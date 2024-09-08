import React from 'react';
import styles from './BurgerParts.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useAppDispatch } from '../../../services/hooks';
import { addIngredientToConstructor, removeAllBunsFromConstructor } from '../../../services/actions/ingredientConstructorActions';
import { IIngredient } from '../../../utils/types';

interface IBurgerPartsProps {
  item: IIngredient & { counter: number };
  handleOpenModal: (item: IIngredient) => void;
}

interface IDragItem {
  id: string;
}

interface DropResult {
  name: string;
}

const BurgerParts: React.FC<IBurgerPartsProps> = ({ item, handleOpenModal }) => {
  const dispatch = useAppDispatch(); // Используем типизированный dispatch
  const [{ isDragging }, dragRef] = useDrag<IDragItem, DropResult, { isDragging: boolean }>({
    type: 'ingredient',
    item: { id: item._id },
    end: (draggedItem, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (dropResult && dropResult.name === 'BurgerConstructor') {
        if (item.type === 'bun') {
          // Удаляю все булки
          dispatch(removeAllBunsFromConstructor());
        }
        // Добавляю новый ингредиент
        dispatch(addIngredientToConstructor(item));
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={styles.partsItem}
      onClick={() => handleOpenModal(item)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={styles.partsContainer}>
        <img src={item.image} alt={item.name} />
        <div className={styles.priceContainer}>
          <p>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.nameContainer}>
          <p>{item.name}</p>
        </div>
        <Counter count={item.counter} size="default" extraClass="m-1 counter" />
      </div>
    </div>
  );
};

export default BurgerParts;
