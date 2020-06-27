import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserManagement from './pages/UserManagement/index';
import CataclysmicVariables from './pages/CatclysmicVariables/index';
import Submissions from './pages/Submissions/index';
import Documentation from './pages/Documentation/index';
import Login from './pages/Login/index';

import { isAuthenticated } from "./services/auth";

export default function Routes() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
          }
        />
      );

    return (
        <div className="routes">
            <Switch>
                <Route path="/" exact component={Login}/>
                <PrivateRoute path="/user-management" component={UserManagement}/>
                <Route path='/cataclysmic-variables' component={CataclysmicVariables}/>
                <Route path='/submissions' component={Submissions}/>
                <Route path='/documentation' component={Documentation}/>
            </Switch>
        </div>
    )
}