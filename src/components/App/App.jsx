import { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/actions/ingredientsActions';

const App = () => {


  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // Рендеринг компонента
  return (
    <Router>
      <AppHeader />

      {error && <h2>Ошибка: {error}</h2>}
      {loading && <h2>Загрузка...</h2>}
      {!loading && !error && (
        <div className={styles.App}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      )}

    </Router>
  );
}

export default App;
