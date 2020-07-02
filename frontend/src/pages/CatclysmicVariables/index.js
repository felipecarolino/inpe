import React from 'react';
import './style.css';

import Sidebar from './sidebar';
import { Route, Switch, Redirect } from 'react-router-dom';

import Variables from '../Variables/index';
import ViewVariables from '../Variables/view';
import CreateVariables from '../Variables/create';
import EditVariables from '../Variables/edit';
import SearchVariable from '../SearchVariable/index';

import { isAuthenticated } from "./../../services/auth";

export default function CataclysmicVariables() {

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
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/cataclysmic-variables/variables" exact component={Variables} />
                <Route path="/cataclysmic-variables/variables/view/:id" component={ViewVariables} />
                <PrivateRoute path="/cataclysmic-variables/variables/create" component={CreateVariables} />
                <PrivateRoute path="/cataclysmic-variables/variables/edit/:id" component={EditVariables} />
                <Route path="/cataclysmic-variables/search/:type" component={SearchVariable} />
            </Switch>
        </div>
    )
}