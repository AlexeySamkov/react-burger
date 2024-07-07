import { useMemo, useCallback } from 'react';
import styles from './BurgerConstructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal';
import OrderDetails from './OrderDetails/OrderDetails';
import { useModal } from './../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../services/actions/orderActions';
import { useDrop } from 'react-dnd';
import { removeIngredientFromConstructor, updateIngredientOrder } from '../../services/actions/ingredientConstructorActions';
import DraggableIngredient from './DraggableIngredient/DraggableIngredient';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorIngredients, order } = useSelector(state => state.ingredients);

  const topBun = constructorIngredients.find(ingredient => ingredient.type === "bun" && ingredient.position === "top");
  const bottomBun = constructorIngredients.find(ingredient => ingredient.type === "bun" && ingredient.position === "bottom");
  const nonBunIngredients = constructorIngredients.filter(ingredient => ingredient.type !== "bun");

  const { isModalOpen, openModal, closeModal } = useModal();

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop: () => ({ name: 'BurgerConstructor' }),
  });

  const handleRemoveIngredient = (uniqueId) => {
    dispatch(removeIngredientFromConstructor(uniqueId));
  };

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch(updateIngredientOrder(dragIndex, hoverIndex));
  }, [dispatch]);

  const handlePlaceOrder = () => {
    const ingredientIds = constructorIngredients.map(ingredient => ingredient._id);
    dispatch(placeOrder(ingredientIds));
    openModal();
  };

  // гарантирует, что сумма будет пересчитываться только тогда, когда изменяется constructorIngredients
  // оптимизированное вычисление суммы заказа, предотвращая ненужные рендеры компонента BurgerConstructor.
  const total = useMemo(() => {
    return constructorIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  }, [constructorIngredients]);

  return (
    <div ref={dropRef} className={styles.burgerConstructor}>
      {constructorIngredients.length === 0 ? (
        <div className={styles.emptyMessage}>
          <p>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.</p>
        </div>
      ) : (
        <>
          <div className={styles.topBun}>
            {topBun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${topBun.name} (верх)`}
                price={topBun.price}
                thumbnail={topBun.image}
              />
            )}
          </div>
          <div className={styles.container}>
            {nonBunIngredients.map((ingredient, index) => (
              <DraggableIngredient
                key={ingredient.uniqueId}
                index={index}
                ingredient={ingredient}
                moveIngredient={moveIngredient}
                handleRemoveIngredient={handleRemoveIngredient}
              />
            ))}
          </div>
          <div className={styles.downBun}>
            {bottomBun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bottomBun.name} (низ)`}
                price={bottomBun.price}
                thumbnail={bottomBun.image}
              />
            )}
          </div>
          </>
      )}
      <div className={styles.orderSection}>
      <div className={styles.totalPrice}>
        <p>{total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="medium" onClick={handlePlaceOrder} disabled={!(topBun && bottomBun)}>
        Оформить заказ
      </Button>
    </div>

      {isModalOpen && (
        <Modal header="Ваш заказ" onClose={closeModal}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
