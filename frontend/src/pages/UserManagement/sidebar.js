import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="sidebar-user-management">
            <Nav defaultActiveKey="/users" variant="pills" className="flex-sm-column">
                <Nav.Link eventKey="disabled" disabled>User Management</Nav.Link>
                <Link to="/user-management/roles" className="nav-link">Roles</Link>
                <Link to="/user-management/users" className="nav-link">Users</Link>
                <Link to="/user-management/user-password" className="nav-link">User Password</Link>
            </Nav>
        </div>
    )
}