import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  // useState для управления состоянием данных и состоянием загрузки
  const [burgerData, setburgerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Асинхронная функция для выполнения запроса к API
    const fetchData = async () => {
      try {
        const response = await fetch(SOURCE);
        if (!response.ok) {
          throw new Error('Произошла ошибка при запросе данных: ' + response.statusText);
        }
        const data = await response.json();
        setburgerData(data.data); // Обновляем состояние данных ингредиентов
        setIsLoading(false); // Указываем, что загрузка завершена
      } catch (error) {
        setError(error.message); // Обработка возможной ошибки запроса
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей, чтобы эффект сработал один раз после монтирования компонента

  // Рендеринг компонента
  return (
    <Router>
      <AppHeader />
      <div className={styles.App}>
        {error && <h2>Ошибка: {error}</h2>}
        {isLoading ? (
          <h2>Загрузка...</h2>
        ) : (
          <>
            <BurgerIngredients data={burgerData} />
            <BurgerConstructor data={burgerData} />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
