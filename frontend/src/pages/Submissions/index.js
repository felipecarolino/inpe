import React from 'react';
import './style.css';

import { Route, Switch } from 'react-router-dom';

import PublicSubmissions from '../PublicSubmissions/index';

export default function Submissions() {

    return (
        <div className="content">
            <Switch>
                <Route exact path="/submissions" component={PublicSubmissions} /> 
            </Switch>
        </div>
    )
}