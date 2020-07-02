import React from 'react';
import './style.css';

import Sidebar from './sidebar';
import { Route, Switch, Redirect } from 'react-router-dom';

import Roles from '../Roles/index';
import ViewRoles from '../Roles/view';
import CreateRoles from '../Roles/create';
import EditRoles from '../Roles/edit';
import Users from '../Users/index';
import ViewUsers from '../Users/view';
import CreateUsers from '../Users/create';
import EditUsers from '../Users/edit';
import UserPassword from '../UserPassword/index';

import { isAuthenticated } from "./../../services/auth";

export default function UserManagement() {

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
                <PrivateRoute path="/user-management/roles" exact component={Roles} />
                <PrivateRoute path="/user-management/roles/view/:id" component={ViewRoles} />
                <PrivateRoute path="/user-management/roles/create" component={CreateRoles} />
                <PrivateRoute path="/user-management/roles/edit/:id" component={EditRoles} />
                <PrivateRoute path="/user-management/users" exact component={Users} />
                <PrivateRoute path="/user-management/users/view/:id" component={ViewUsers} />
                <PrivateRoute path="/user-management/users/create" component={CreateUsers} />
                <PrivateRoute path="/user-management/users/edit/:id" component={EditUsers} />
                <PrivateRoute path="/user-management/user-password" component={UserPassword} />
            </Switch>
        </div>
    )
}