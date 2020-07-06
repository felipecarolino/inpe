import React from 'react';
import './style.css';
import { Link } from "react-router-dom";
import logo from './../../assets/img/logo.png';
import brazilThumbnail from './../../assets/img/brazil_thumbnail.png';
import usaThumbnail from './../../assets/img/usa_thumbnail.png';
import IconAccount from './../../assets/img/user.png';
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
                    <img className="logo" src={logo} alt="Logo inpe" />
                </div>
                <div className="header-title">
                    <h1>Cataclysmic Variables Portal</h1>
                </div>
                <div className="header-flags">
                    <a href="#pt-br"><img src={brazilThumbnail} alt="Brazil flag thumbnail" className="header-flag-br" /></a>
                    <a href="#en-us"><img src={usaThumbnail} alt="USA flag thumbnail" className="header-flag-us" /></a>
                </div>
            </div>

            <div className="header-nav">
            <Navbar collapseOnSelect expand="sm">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    {isAuthenticated() ? <Link to="/user-management" className="nav-link">User Management</Link> : null}
                            <Link to="/cataclysmic-variables" className="nav-link">Cataclysmic Variables</Link>
                            <Link to="/submissions" className="nav-link">Submissions</Link>
                            <Link to="/documentation" className="nav-link">Documentation</Link>
                    </Nav>
                    <Nav>
                    {isAuthenticated() ?
                        <>
                        <Link to="/cataclysmic-variables/variables" className="nav-link" onClick={Logout} >{localStorage.getItem("user")} (Logout)</Link>
                        <Link to="/restrict-area" className="user nav-link"><img src={IconAccount} alt="Account Icon" className="iconAccount" /></Link>
                        </>
                            :
                        <Link to="/restrict-area" className="nav-link">Restrict Area</Link> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        </div>
    )
}
