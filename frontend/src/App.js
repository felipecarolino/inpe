import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './pages/Header/index';
import Routes from './Routes';
import Footer from './pages/Footer/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes />
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
