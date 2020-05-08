import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';

export default function Menu() {
    return (
        <div className="menu">
            <Nav defaultActiveKey="/home" variant="pills" className="flex-sm-column">
                <Nav.Link href="/home">User Management</Nav.Link>
                <Nav.Link eventKey="link-1">Roles</Nav.Link>
                <Nav.Link eventKey="link-2">Users</Nav.Link>
                <Nav.Link eventKey="link-3">Permissions</Nav.Link>
            </Nav>
        </div>
    )
}