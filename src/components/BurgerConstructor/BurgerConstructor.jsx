import styles from './BurgerConstructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal';
import { burgerPartShape } from './../../utils/types';
import OrderDetails from './OrderDetails/OrderDetails';
import { useModal } from './../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../services/actions/orderActions';
import { useDrop } from 'react-dnd';
import { removeIngredientFromConstructor } from '../../services/actions/ingredientConstructorActions';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector(state => state.ingredients);

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

  const handlePlaceOrder = () => {
    dispatch(placeOrder(constructorIngredients));
    openModal();
  };

  const total = constructorIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

  return (
    <div ref={dropRef} className={styles.burgerConstructor}>
      <div className={styles.topBun}>
        {topBun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={topBun.name}
            price={topBun.price}
            thumbnail={topBun.image}
          />
        )}
      </div>
      <div className={styles.container}>
        {nonBunIngredients.map((ingredient, index) => (
          <div key={ingredient.uniqueId} className={styles.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={() => handleRemoveIngredient(ingredient.uniqueId)}
            />
          </div>
        ))}
      </div>
      <div className={styles.downBun}>
        {bottomBun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bottomBun.name}
            price={bottomBun.price}
            thumbnail={bottomBun.image}
          />
        )}
      </div>
      <div className={styles.orderSection}>
        <div className={styles.totalPrice}>
          <p>{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={handlePlaceOrder}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal header="Ваш заказ" onClose={closeModal}>
          <OrderDetails total={total} />
        </Modal>
      )}
    </div>
  );
};

// проверяю типы 
BurgerConstructor.propTypes = {
  ingredients: burgerPartShape
};

export default BurgerConstructor;