import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './pages/Users/index';
import CataclysmicVariables from './pages/CatclysmicVariables/index';
import Submissions from './pages/Submissions/index';
import Documentation from './pages/Documentation/index';

export default function Routes() {
    return (
        <div className="routes">
            <Switch>
                <Route path="/users" component={Users}/>
                <Route path='/cataclysmic-variables' component={CataclysmicVariables}/>
                <Route path='/submissions' component={Submissions}/>
                <Route path='/documentation' component={Documentation}/>
            </Switch>
        </div>
    )
}