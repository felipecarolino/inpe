import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="sidebar">
            <Nav defaultActiveKey="/users" variant="pills" className="flex-sm-column">
                <Nav.Link eventKey="disabled" disabled>Cataclysmic Variables</Nav.Link>
                <Link to="/cataclysmic-variables/variables" className="nav-link">List</Link>
                <Link to="/cataclysmic-variables/search" className="nav-link">Search</Link>
            </Nav>
        </div>
    )
}