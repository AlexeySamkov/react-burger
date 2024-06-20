import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';

function App() {
  return (
    <Router>
         <AppHeader/>  
    <div className="App">
      <BurgerIngredients />    
      <BurgerConstructor/>
    </div>
    </Router>
  );
}

export default App;
