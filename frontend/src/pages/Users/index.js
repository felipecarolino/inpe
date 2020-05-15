import React, { useState } from 'react';
import './style.css';
import { Route, Switch } from 'react-router-dom';

import Sidebar from './../Sidebar/index';
import Roles from './../Roles/index';

export default function Users() {
    return (
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/users/roles" component={Roles} />
            </Switch>
        </div>
    )
}