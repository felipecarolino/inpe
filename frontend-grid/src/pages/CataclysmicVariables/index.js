import React from 'react';

import { Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./../../services/auth";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Nav from './nav';
import List from '../../components/Variables/list';
import View from '../../components/Variables/view';
import Create from '../../components/Variables/create';
import Edit from '../../components/Variables/edit';
import Search from '../../components/Search/index';

export default function CataclysmicVariables() {

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
                        <Route exact path="/variables" component={List} />
                        <Route path="/variables/view/:id" component={View} />
                        <Route path="/variables/search/:type" component={Search} />
                        <PrivateRoute path="/variables/create" component={Create} />
                        <PrivateRoute path="/variables/edit/:id" component={Edit} />
                    </Switch>
                </Col>
            </Row>
        </Container>
    )
}