import React from 'react';
import './style.css';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { isAuthenticated } from "./../../services/auth";
import { logout } from "../../services/auth";

import { useHistory } from "react-router-dom";

export default function Header() {

    const history = useHistory();

    const Logout = () => {
        history.push('/cataclysmic-variables/variables');
        logout();
    }

    return (
        <div className="header">
            <div className="header-top">
                <div className="header-logo">
                    <img className="logo" src='/img/logo.png' alt="Logo inpe" />
                </div>
                <div className="header-title">
                    <Link to="/" className="nav-link"><h1>Cataclysmic Variables Portal</h1></Link>
                </div>
                <div className="header-flags">
                    <a href="#pt-br"><img src='/img/brazil_thumbnail.png' alt="Brazil flag thumbnail" className="header-flag-br" /></a>
                    <a href="#en-us"><img src='/img/usa_thumbnail.png' alt="USA flag thumbnail" className="header-flag-us" /></a>
                </div>
            </div>

            <div className="header-nav">
                <Navbar collapseOnSelect expand="sm">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {isAuthenticated() ? <Link to="/user-management" className="nav-link">User Management</Link> : null}
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/cataclysmic-variables" className="nav-link">Catalog</Link>
                            {isAuthenticated() ? <Link to="/submission-management" className="nav-link">Submission Management</Link>
                                :
                                <Link to="/submissions" className="nav-link">Submissions</Link>}
                            <Link to="/documentation" className="nav-link">Documentation</Link>
                        </Nav>
                        <Nav>
                            {isAuthenticated() ?
                                <>
                                    <Link to="/cataclysmic-variables/variables" className="nav-link" onClick={Logout} >{localStorage.getItem("user")} (Logout)</Link>
                                    <Link to="/restrict-area" className="user nav-link"><img src='/img/user.png' alt="Account Icon" className="iconAccount" /></Link>
                                </>
                                :
                                <Link to="/restrict-area" className="nav-link">Restricted Area</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}
