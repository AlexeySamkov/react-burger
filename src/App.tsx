import React from 'react';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';

function App() {
  return (
    <Router>
         <AppHeader/>  
    <div className="App">

      <BurgerConstructor/>
      <BurgerIngredients />          
    </div>
    </Router>
  );
}

export default App;
