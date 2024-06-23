import React from 'react';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import data from './utils/data.json'

function App() {
  return (
    <Router>
      <AppHeader/>  
    <div className="App">
      {data.length > 0 ? <BurgerConstructor data={data}/> : <h2>Загрузка...</h2>}
      {data.length > 0 ? <BurgerIngredients data={data}/> : <h2>Загрузка...</h2>}
    </div>
    </Router>
  );
}

export default App;
