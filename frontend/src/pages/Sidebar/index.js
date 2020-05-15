import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';

export default function Sidebar() {

    return (
        <div className="sidebar">
            <Nav defaultActiveKey="/users" variant="pills" className="flex-sm-column">
                <Nav.Link eventKey="disabled" disabled>User Management</Nav.Link>
                <Nav.Link eventKey="/users/roles" href="/users/roles">Roles</Nav.Link>
                <Nav.Link eventKey="/users/users" href="/users/users">Users</Nav.Link>
                <Nav.Link eventKey="/users/Permissions" href="/users/permissions">Permissions</Nav.Link>
            </Nav>
        </div>
    )
}