import React from 'react';
import './style.css';

import Sidebar from './../Sidebar/index';
import { Route, Switch } from 'react-router-dom';

import Roles from './../Roles/index';
import View from './../Roles/view';
import Create from './../Roles/create';

export default function Users() {
    return (
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/users/roles" exact component={Roles} />
                <Route path="/users/roles/view/:id" component={View} />
                <Route path="/users/roles/create" component={Create} />
            </Switch>
        </div>
    )
}