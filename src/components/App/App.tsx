import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchIngredients } from '../../services/actions/ingredientsActions';
import { setCurrentIngredient, clearCurrentIngredient } from '../../services/actions/currentIngredientActions';
import { useModal } from '../../hooks/useModal';
import AppHeader from '../AppHeader/AppHeader';
import Home from '../../pages/Home/Home';
import IngredientDetailsPage from '../../pages/IngredientDetailsPage/IngredientDetailsPage';
import Modal from '../Modal/Modal';
import IngredientDetails from '../BurgerIngredients/IngredientDetails/IngredientDetails';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { getUser } from '../../services/actions/userActions'; 
import { IIngredient } from '../../utils/types';
import type { RootState } from '../../services/store';

import styles from './App.module.css';



const App: React.FC = () => {
  const dispatch = useAppDispatch(); // Используем типизированный dispatch
  const { loading, error, ingredients, currentIngredient  } = useSelector((state: RootState) => state.ingredients);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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

  // чтобы не терялось состоояние при перезагрузке. но помогло совсем другое
  useEffect(() => {
    if (isModalOpen && !loading && location.pathname.startsWith('/ingredients/') && !currentIngredient) {
      const ingredientId = location.pathname.split('/').pop();
      const ingredient = ingredients.find((item: IIngredient) => item._id === ingredientId); 
           
      if (ingredient) {                
        dispatch(setCurrentIngredient(ingredient));
      }
    }
  }, [isModalOpen, loading, location, currentIngredient, ingredients, dispatch]);

  useEffect(() => {
    // Проверка токенов и получение данных пользователя при инициализации
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken && !isAuthenticated) {
      // console.log('accessToken', accessToken)
      // console.log('refreshToken', refreshToken)
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated]);

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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword />} />} />
            <Route path="/profile/*" element={<ProtectedRouteElement element={<Profile />} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* background: Проверяет, был ли сохранен маршрутный фон в состоянии при навигации.  
              isModalOpen: Проверяет, открыто ли модальное окно
              модальное окно с деталями ингредиента будет отображаться только в том случае, 
              если был переход с состоянием background и состояние модального окна isModalOpen истинно,
              то рендерится этот блок
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
                    <IngredientDetails currentIngredient={ingredients.find((item: IIngredient) => item._id === location.pathname.split('/').pop()) || null} />
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
