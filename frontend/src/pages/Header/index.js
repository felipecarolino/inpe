import React from 'react';
import './style.css';
import logo from './../../assets/img/logo.png';
import brazilThumbnail from './../../assets/img/brazil_thumbnail.png';
import usaThumbnail from './../../assets/img/usa_thumbnail.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {

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
                            <Nav.Link href="#users">Users</Nav.Link>
                            <Nav.Link href="#cataclysmic-variables">Cataclysmic Variables</Nav.Link>
                            <Nav.Link href="#submissions">Submissions</Nav.Link>
                            <Nav.Link href="#documentation">Documentation</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}
