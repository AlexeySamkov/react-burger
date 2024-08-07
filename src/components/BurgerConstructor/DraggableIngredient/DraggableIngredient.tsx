import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './DraggableIngredient.module.css';
import { IIngredient } from '../../../utils/types';

interface IDraggableIngredientProps {
  ingredient: IIngredient & { uniqueId: string };
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveIngredient: (uniqueId: string) => void;
}

interface IDragItem {
  type: string;
  uniqueId: string;
  index: number;
}

const DraggableIngredient: React.FC<IDraggableIngredientProps> = ({ ingredient, index, moveIngredient, handleRemoveIngredient }) => {

    const ref = React.useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<IDragItem>({
        accept: 'ingredient',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (clientOffset) {
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: { type: 'ingredient', uniqueId: ingredient.uniqueId, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={styles.ingredientItem} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleRemoveIngredient(ingredient.uniqueId)}
            />
        </div>
    );
};

export default DraggableIngredient;