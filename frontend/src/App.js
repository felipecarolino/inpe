import React from 'react';
import './style.css';
import { Switch, Route } from 'react-router-dom';
import Header from './pages/Header/index';
import Menu from './pages/Menu/index';
import Principal from './pages/Principal/index';
import CataclysmicVariables from './pages/CatclysmicVariables/index';
import Submissions from './pages/Submissions/index';
import Documentation from './pages/Documentation/index';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="container">
              <Menu />
              <Switch>
                <Route path="/" exact component={Principal} />
                <Route path="/cataclysmic-variables" exact component={CataclysmicVariables} />
                <Route path="/submissions" exact component={Submissions} />
                <Route path="/documentation" exact component={Documentation} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
