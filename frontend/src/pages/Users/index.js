import React from 'react';
import './style.css';

import Sidebar from './../Sidebar/index';
import Roles from './../Roles/index';

export default function Users() {
    return (
        <div className="content">
            <Sidebar />
            <Roles />
        </div>
    )
}