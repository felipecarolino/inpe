import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './app.css';

import Header from './pages/Header/index';
import Main from './pages/Main/index';
import Footer from './pages/Footer/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
