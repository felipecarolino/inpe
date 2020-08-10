import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header/index';
import Main from './components/Main/index';
// import Footer from './components/Footer/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;