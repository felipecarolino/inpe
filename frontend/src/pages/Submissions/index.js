import React from 'react';
import './style.css';

import { Route, Switch } from 'react-router-dom';

import PublicSubmissions from '../PublicSubmissions/index';

//import { isAuthenticated } from "./../../services/auth";

export default function Submissions() {

    return (
        <div className="content">
            <Switch>
                <Route exact path="/submissions" component={PublicSubmissions} /> 
                {/* <Route path="/cataclysmic-variables/variables" exact component={Variables} />
                <Route path="/cataclysmic-variables/variables/view/:id" component={ViewVariables} />
                <PrivateRoute path="/cataclysmic-variables/variables/create" component={CreateVariables} />
                <PrivateRoute path="/cataclysmic-variables/variables/edit/:id" component={EditVariables} />
                <Route path="/cataclysmic-variables/search/:type" component={SearchVariable} /> */}
            </Switch>
        </div>
    )
}