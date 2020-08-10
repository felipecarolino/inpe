import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from "./services/auth";

import CataclysmicVariables from './pages/CataclysmicVariables/index';
import Submissions from './pages/Submissions/index';
import Documentation from './pages/Documentation/index';
import RestrictArea from './pages/RestrictArea/index';
import Management from './pages/Management/index';

export default function Routes() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/restrict-area", state: { from: props.location } }} />
            )
          }
        />
      );

    return (
        <Switch>
            <Route exact path='/'> <Redirect to="/variables" /> </Route>
            <Route path='/variables' component={CataclysmicVariables} />
            <Route path='/submissions' component={Submissions} />
            <Route path='/documentation' component={Documentation} />
            <Route exact path="/restrict-area" component={RestrictArea}/>
            <PrivateRoute path="/management" component={Management}/>
        </Switch>
    )
}