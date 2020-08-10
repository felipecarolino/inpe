import React from 'react';

import { NavLink } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';

export default function VariablesNav() {

    return (
        <Nav variant="pills" defaultActiveKey="/management/roles" className="flex-md-column">
            <Nav.Item className="d-none d-md-block">
                <Nav.Link disabled><strong>Management</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/management/roles">Roles</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/management/users">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/management/reset-password">Reset Password</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}