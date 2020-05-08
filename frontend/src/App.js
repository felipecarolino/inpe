import React from 'react';
import './style.css';
import Header from './pages/Header/index';
import Principal from './pages/Principal/index';
import Menu from './pages/Menu/index';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Menu />
        <Principal />
      </div>
    </div>
  );
}

export default App;
