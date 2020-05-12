import React from 'react';
import './style.css';

import Sidebar from './../Sidebar/index';
import Main from './../Main/index';

export default function Users() {
    return (
        <div className="content">
            <Sidebar />
            <Main />
        </div>
    )
}