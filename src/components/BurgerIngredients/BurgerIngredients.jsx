import { useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

import { burgerPartShape } from './../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from './../../hooks/useModal';
import { setCurrentIngredient, clearCurrentIngredient } from '../../services/actions/currentIngredientActions';
import BurgerParts from './BurgerParts/BurgerParts';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState(null);

    const dispatch = useDispatch();
    const { ingredients, groupTypes, currentIngredient } = useSelector(state => state.ingredients);
    const { isModalOpen, openModal, closeModal } = useModal();

    const handleOpenModal = (item) => {
        dispatch(setCurrentIngredient(item));
        openModal();
    };

    const handleCloseModal = () => {
        dispatch(clearCurrentIngredient());
        closeModal();
    };

    return (
        <div className={styles.burgerIngredients}>
            <div className={styles.burgerHeader}>Соберите бургер</div>
            <div className={styles.burgerTabs}>
                {groupTypes.map((groupType) => (
                    <Tab key={groupType.type} value={groupType.type} active={current === groupType.type} onClick={setCurrent} >
                        {groupType.name}
                    </Tab>
                ))}
            </div>
            <div className={styles.burgerBox}>
                <div>
                    {groupTypes.map((groupType) =>
                        <div key={groupType.type}>
                            <h2>{groupType.name}</h2>
                            <div className={styles.partsContainer}>
                                {ingredients.filter(item => item.type === groupType.type).map((item) => (
                                    <BurgerParts key={item._id} item={item} handleOpenModal={handleOpenModal} />
                                ))}
                            </div>
                        </div>
                    )}
                    {isModalOpen && (
                        <Modal header={"Детали ингредиента"} onClose={handleCloseModal}>
                            {currentIngredient && (<IngredientDetails currentIngredient={currentIngredient} />)}
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: burgerPartShape
};

export default BurgerIngredients;
