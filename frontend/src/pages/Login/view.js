import React from 'react';

import Table from 'react-bootstrap/Table';

import './style.css';

export default function View() {

    return (
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{localStorage.getItem("name")}</td>
                </tr>
                <tr>
                    <th className="w-25">Username</th>
                    <td>{localStorage.getItem("user")}</td>
                </tr>
                <tr>
                    <th className="w-25">Email</th>
                    <td>{localStorage.getItem("email")}</td>
                </tr>
            </tbody>
        </Table>
    )
}
