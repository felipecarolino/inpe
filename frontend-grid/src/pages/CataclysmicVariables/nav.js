import React from 'react';

import { NavLink } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function VariablesNav() {

    return (
        <Nav variant="pills" defaultActiveKey="/variables" className="flex-md-column">
            <Nav.Item className="d-none d-md-block">
                <Nav.Link disabled><strong>Cataclysmic Variables</strong></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/variables">List</Nav.Link>
            </Nav.Item>
            <NavDropdown title="Search" id="nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/variables/search/name">by Name</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/variables/search/coordinates">by Coordinates</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}