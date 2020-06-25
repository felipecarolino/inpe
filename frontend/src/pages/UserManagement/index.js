import React from 'react';
import './style.css';

import Sidebar from './sidebar';
import { Route, Switch } from 'react-router-dom';

import Roles from '../Roles/index';
import ViewRoles from '../Roles/view';
import CreateRoles from '../Roles/create';
import EditRoles from '../Roles/edit';
import Users from '../Users/index';
import ViewUsers from '../Users/view';
import CreateUsers from '../Users/create';
import EditUsers from '../Users/edit';
import UserPassword from '../UserPassword/index';

export default function UserManagement() {
    return (
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/user-management/roles" exact component={Roles} />
                <Route path="/user-management/roles/view/:id" component={ViewRoles} />
                <Route path="/user-management/roles/create" component={CreateRoles} />
                <Route path="/user-management/roles/edit/:id" component={EditRoles} />
                <Route path="/user-management/users" exact component={Users} />
                <Route path="/user-management/users/view/:id" component={ViewUsers} />
                <Route path="/user-management/users/create" component={CreateUsers} />
                <Route path="/user-management/users/edit/:id" component={EditUsers} />
                <Route path="/user-management/user-password" component={UserPassword} />
            </Switch>
        </div>
    )
}