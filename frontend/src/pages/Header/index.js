import React from 'react';
import './style.css';
import logo from './../../assets/img/logo.jpg';
import brazilThumbnail from './../../assets/img/brazil_thumbnail.png';
import usaThumbnail from './../../assets/img/usa_thumbnail.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
    
    return (
        <div className="header">
            <div className="header-top">
                <img className="header-logo" src={logo} alt="Logo inpe" />
                <h1>Cataclysmic Variables Portal</h1>
                <div className="header-language">
                    <a href="#"><img src={brazilThumbnail} alt="Brazil flag thumbnail" /></a>
                    <a href="#"><img src={usaThumbnail} alt="USA flag thumbnail" /></a>
                </div>
            </div>

            <div className="header-nav">
                <Navbar className="header-navbar">
                    <Nav>
                        <Nav.Link href="#users">Users</Nav.Link>
                        <Nav.Link href="#cataclysmic-variables">Cataclysmic Variables</Nav.Link>
                        <Nav.Link href="#submissions">Submissions</Nav.Link>
                        <Nav.Link href="#documentation">Documentation</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}
