import React from 'react';
import './style.css';

import Sidebar from './../Sidebar/index';
import { Route, Switch } from 'react-router-dom';

import Roles from './../Roles/index';
import ViewRoles from './../Roles/view';
import CreateRoles from './../Roles/create';
import EditRoles from './../Roles/edit';
import UsersManagement from '../UsersManagement/index';
import ViewUsers from './../UsersManagement/view';
import CreateUsers from './../UsersManagement/create';
import EditUsers from './../UsersManagement/edit';

export default function Users() {
    return (
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/users/roles" exact component={Roles} />
                <Route path="/users/roles/view/:id" component={ViewRoles} />
                <Route path="/users/roles/create" component={CreateRoles} />
                <Route path="/users/roles/edit/:id" component={EditRoles} />
                <Route path="/users/users" exact component={UsersManagement} />
                <Route path="/users/users/view/:id" component={ViewUsers} />
                <Route path="/users/users/create" component={CreateUsers} />
                <Route path="/users/users/edit/:id" component={EditUsers} />
            </Switch>
        </div>
    )
}