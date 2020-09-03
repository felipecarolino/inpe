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

export default function SubmissionManagement() {

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
                <Route exact path="/submission-management"> <Redirect to="/submission-management/submissions" /> </Route>
                <Route path="/submission-management/submissions" exact component={Submissions} />
                <Route path="/submission-management/submissions/view/:id" component={ViewSubmissions} />
                <PrivateRoute path="/submission-management/submissions/create" component={CreateSubmissions} />
                <PrivateRoute path="/submission-management/submissions/edit/:id" component={EditSubmissions} />
                {/* <Route path="/submission-management/search/:type" component={SearchVariable} /> */}
            </Switch>
        </div>
    )
}