import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <Router>
    <div className="App">
      <AppHeader/>      
    </div>
    </Router>
  );
}

export default App;
