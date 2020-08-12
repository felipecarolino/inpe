import React from 'react';
import './style.css';

import Sidebar from './sidebar';
import { Route, Switch, Redirect } from 'react-router-dom';

import Submissions from '../PrivateSubmissions/index';
import ViewSubmissions from '../PrivateSubmissions/view';
import CreateSubmissions from '../PrivateSubmissions/create';
import EditSubmissions from '../PrivateSubmissions/edit';
//import SearchVariable from '../SearchVariable/index';

import { isAuthenticated } from "./../../services/auth";

export default function ManagementSubmissions() {

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
                <Route exact path="/management-submissions"> <Redirect to="/management-submissions/submissions" /> </Route>
                <Route path="/management-submissions/submissions" exact component={Submissions} />
                <Route path="/management-submissions/submissions/view/:id" component={ViewSubmissions} />
                <PrivateRoute path="/management-submissions/submissions/create" component={CreateSubmissions} />
                <PrivateRoute path="/management-submissions/submissions/edit/:id" component={EditSubmissions} />
                {/* <Route path="/management-submissions/search/:type" component={SearchVariable} /> */}
            </Switch>
        </div>
    )
}