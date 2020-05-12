import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Nav defaultActiveKey="/users" variant="pills" className="flex-sm-column">
                <Nav.Link eventKey="disabled" disabled>User Management</Nav.Link>
                <Nav.Link eventKey="link-1">Roles</Nav.Link>
                <Nav.Link eventKey="link-2">Users</Nav.Link>
                <Nav.Link eventKey="link-3">Permissions</Nav.Link>
            </Nav>
        </div>
    )
}