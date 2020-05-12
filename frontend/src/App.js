import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './pages/Header/index';
import Routes from './Routes';

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
