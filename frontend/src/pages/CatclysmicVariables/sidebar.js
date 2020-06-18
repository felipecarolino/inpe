import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="sidebar">
            <Nav defaultActiveKey="/users" variant="pills" className="flex-sm-column">
                <Nav.Link eventKey="disabled" disabled>Cataclysmic Variables</Nav.Link>
                <Link to="/cataclysmic-variables/variables" className="nav-link">List</Link>
                <DropdownButton
                    id={"dropdown-button-drop-right"}
                    drop="right"
                    title="Search"
                    variant="secondary" >
                    <Link to="/cataclysmic-variables/search/name" className="nav-link">by Name</Link>
                    <Link to="/cataclysmic-variables/search/coordinate" className="nav-link">by Coordinate</Link>
                </DropdownButton>
            </Nav>
        </div>
    )
}