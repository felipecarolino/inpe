import React from 'react';

import { Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../../services/auth";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Nav from './nav';

import Roles from './../../components/Roles/index';
import ViewRoles from './../../components/Roles/view';
import CreateRoles from './../../components/Roles/create';
import EditRoles from './../../components/Roles/edit';
import Users from './../../components/Users/index';
import ViewUsers from './../../components/Users/view';
import CreateUsers from './../../components/Users/create';
import EditUsers from './../../components/Users/edit';
import ResetPassword from './../../components/ResetPassword/index';

export default function Management() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: "/restrict-area", state: { from: props.location } }} />
                    )
            }
        />
    );

    return (
        <Container fluid="md" className="mt-3">
            <Row>
                <Col md="auto d-flex justify-content-center">
                    <Nav />
                </Col>
                <Col>
                    <Switch>
                        <Route exact path="/management"><Redirect to="/management/roles" /></Route>
                        <PrivateRoute exact path="/management/roles" component={Roles} />
                        <PrivateRoute path="/management/roles/view/:id" component={ViewRoles} />
                        <PrivateRoute path="/management/roles/create" component={CreateRoles} />
                        <PrivateRoute path="/management/roles/edit/:id" component={EditRoles} />
                        <PrivateRoute exact path="/management/users" component={Users} />
                        <PrivateRoute path="/management/users/view/:id" component={ViewUsers} />
                        <PrivateRoute path="/management/users/create" component={CreateUsers} />
                        <PrivateRoute path="/management/users/edit/:id" component={EditUsers} />
                        <PrivateRoute path="/management/reset-password" component={ResetPassword} />
                    </Switch>
                </Col>
            </Row>
        </Container>
    )
}