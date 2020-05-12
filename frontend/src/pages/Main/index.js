import React from 'react';
import './style.css';
import View from './../../assets/img/eye.svg';
import Edit from './../../assets/img/edit.svg';
import Delete from './../../assets/img/trash.svg';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default function Main() {

    return (
        <div className="main">
                <Card className="main-card">
                    <Card.Header as="h5">Roles List</Card.Header>
                    <Card.Body className="main-card-body">
                        <Card.Text className="main-card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo nunc a lectus sodales cursus.
                        </Card.Text>
                        <div className="main-table">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Administrators</td>
                                        <td></td>
                                        <td>
                                            <a href="#view"><img src={View} alt="View Icon" className="view" /></a>
                                            <a href="#edit"><img src={Edit} alt="Edit Icon" className="edit" /></a>
                                            <a href="#delete"><img src={Delete} alt="Delete Icon" className="delete" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Contributors</td>
                                        <td></td>
                                        <td>
                                            <a href="#view"><img src={View} alt="View Icon" className="view" /></a>
                                            <a href="#edit"><img src={Edit} alt="Edit Icon" className="edit" /></a>
                                            <a href="#delete"><img src={Delete} alt="Delete Icon" className="delete" /></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
        </div>
    )
}
