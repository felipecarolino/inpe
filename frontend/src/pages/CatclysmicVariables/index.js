import React from 'react';
import './style.css';

import Sidebar from './sidebar';
import { Route, Switch } from 'react-router-dom';

import Variables from '../Variables/index';
import ViewVariables from '../Variables/view';
import CreateVariables from '../Variables/create';
import EditVariables from '../Variables/edit';

export default function CataclysmicVariables() {
    return (
        <div className="content">
            <Sidebar />
            <Switch>
                <Route path="/cataclysmic-variables/variables" exact component={Variables} />
                <Route path="/cataclysmic-variables/variables/view/:id" component={ViewVariables} />
                <Route path="/cataclysmic-variables/variables/create" component={CreateVariables} />
                <Route path="/cataclysmic-variables/variables/edit/:id" component={EditVariables} />
            </Switch>
        </div>
    )
}