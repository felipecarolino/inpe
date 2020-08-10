import React from 'react';

import { NavLink, useHistory } from "react-router-dom";

import { isAuthenticated } from "./../../services/auth";
import { logout } from "../../services/auth";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import user from './../../assets/images/user.svg';

export default function HeaderNav() {

    const history = useHistory();

    const Logout = () => {
        history.push('/variables');
        logout();
    }

    return (
        <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" className="justify-content-end">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav align-items-center">
                <Nav className="m-auto text-right">
                    <Nav.Link eventKey="1" as={NavLink} to="/management" className={isAuthenticated() ? "" : "d-none"}>Management</Nav.Link>
                    <Nav.Link eventKey="2" as={NavLink} to="/variables">Cataclysmic Variables</Nav.Link>
                    <Nav.Link eventKey="3" as={NavLink} to="/submissions">Submissions</Nav.Link>
                    <Nav.Link eventKey="4" as={NavLink} to="/documentation">Documentation</Nav.Link>
                </Nav>
                <Nav className="text-right">
                    <Nav.Link eventKey="5" as={NavLink} to="#" className={isAuthenticated() ? "" : "d-none"} onClick={Logout}>{localStorage.getItem("user")} (Logout)</Nav.Link>
                    <Nav.Link eventKey="6" as={NavLink} to="/restrict-area" className={isAuthenticated() ? "p-0" : "d-none"}><Image width="40px" src={user} fluid /></Nav.Link>
                    <Nav.Link eventKey="7" as={NavLink} to="/restrict-area" className={isAuthenticated() ? "d-none" : ""}>Restrict Area</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}