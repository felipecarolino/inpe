import React from 'react';
import './style.css';

import { Route, Switch } from 'react-router-dom';

import PublicSubmissions from '../PublicSubmissions/index';
import SuccessMessage from '../PublicSubmissions/successMessage';

export default function Submissions() {

    return (
        <div className="content">
            <Switch>
                <Route exact path="/submissions" component={PublicSubmissions} /> 
                <Route exact path="/submissions/success" component={SuccessMessage} /> 
            </Switch>
        </div>
    )
}