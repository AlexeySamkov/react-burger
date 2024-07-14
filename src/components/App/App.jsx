import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/actions/ingredientsActions';
import { clearCurrentIngredient } from '../../services/actions/currentIngredientActions';
import { useModal } from '../../hooks/useModal';
import AppHeader from '../AppHeader/AppHeader';
import Home from '../../pages/Home';
import IngredientDetailsPage from '../../pages/IngredientDetailsPage';
import Modal from '../Modal/Modal';
import IngredientDetails from '../BurgerIngredients/IngredientDetails/IngredientDetails';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const { loading, error, ingredients } = useSelector((state) => state.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  //позволяет безопасно получить значение background из состояния маршрута, если оно существует, или присвоить background значение undefined, если состояние маршрута не содержит это свойство.

  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    dispatch(clearCurrentIngredient());
    closeModal();
    navigate(-1);
  };

  useEffect(() => {
    if (background) {
      openModal();
    }
  }, [background, openModal]);

  return (
    <>
      <AppHeader />

      {error && <h2>Ошибка: {error}</h2>}
      {loading && <h2>Загрузка...</h2>}
      {!loading && !error && (
        <div className={styles.App}>
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          </Routes>

          {/* background: Проверяет, был ли сохранен маршрутный фон в состоянии при навигации.  
              isModalOpen: Проверяет, открыто ли модальное окно
              модальное окно с деталями ингредиента будет отображаться только в том случае, 
              если был переход с состоянием background и состояние модального окна isModalOpen истинно.
          */}
          {background && isModalOpen && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal header={"Детали ингредиента"} onClose={handleModalClose}>
                    {/*
                     Компонент, отображающий детали ингредиента. Он получает текущий ингредиент из состояния 
                     ingredients на основе ID в URL.  pop() для извлечения последнего сегмента из пути URL                    
                    */}
                    <IngredientDetails currentIngredient={ingredients.find(item => item._id === location.pathname.split('/').pop())} />
                  </Modal>
                }
              />
            </Routes>
          )}
        </div>
      )}
    </>
  );
}

export default App;
