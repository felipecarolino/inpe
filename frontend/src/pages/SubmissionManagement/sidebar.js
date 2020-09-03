import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="sidebar-management-submissions">
            <Nav variant="pills" className="flex-sm-column">
                <Nav.Link eventKey="disabled" disabled>Management Submissions</Nav.Link>
                <Link to="/submission-management/submissions" className="nav-link">List</Link>
                <DropdownButton
                    drop="down"
                    title="Search"
                    variant="secondary" >
                    <Link to="/submission-management/search/id" className="nav-link">by ID</Link>
                </DropdownButton>
            </Nav>
        </div>
    )
}