import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import IconView from './../../assets/img/eye.svg';
import IconEdit from './../../assets/img/edit.svg';
import IconDelete from './../../assets/img/trash.svg';
import IconAdd from './../../assets/img/add.svg';

import './style.css';

export default function Roles() {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const GetRoles = async () => {
            const result = await api.get('roles');
            setRoles(result.data);
        };
        GetRoles();
    }, []);

    return (
        <div className="roles">
            <Card className="roles-card">
                <Card.Header>
                    <h5>Roles List</h5>
                    <Link to="/users/roles/create" className="nav-link">
                        <img src={IconAdd} alt="Add Icon" className="iconAdd" />
                    </Link>
                </Card.Header>
                <Card.Body className="roles-card-body">
                    <Card.Text className="roles-card-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo nunc a lectus sodales cursus.</p>
                    </Card.Text>
                    <div className="roles-table">
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
                                {
                                    roles.map((item, idx) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <Link to={{pathname: `/users/roles/view/${item.id}`}} className="nav-link">
                                                    <img src={IconView} alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to="/users/roles/edit" className="nav-link">
                                                    <img src={IconEdit} alt="Edit Icon" className="iconEdit" />
                                                </Link>
                                                <Link to="/users/roles/delete" className="nav-link">
                                                    <img src={IconDelete} alt="Delete Icon" className="iconDelete" />
                                                </Link>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
