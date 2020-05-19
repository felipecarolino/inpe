import React from 'react';
import './style.css';
import { Route, Switch } from 'react-router-dom';

import Sidebar from './../Sidebar/index';
import Roles from './../Roles/index';
import View from './../Roles/view';

export default function Users() {
    return (
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/users/roles" exact component={Roles} />
                <Route path="/users/roles/view" component={View} />
            </Switch>
        </div>
    )
}