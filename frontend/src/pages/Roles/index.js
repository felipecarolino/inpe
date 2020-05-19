import React, { useState, useEffect } from 'react';
import './style.css';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import ViewIcon from './../../assets/img/eye.svg';
import EditIcon from './../../assets/img/edit.svg';
import DeleteIcon from './../../assets/img/trash.svg';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default function Roles() {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const GetRoles = async () => {
            const result = await api.get('roles');
            setRoles(result.data);
            console.log(result)
        };
        GetRoles();
    }, []);

    return (
        <div className="roles">
            <Card className="roles-card">
                <Card.Header><h5>Roles List</h5><Button size="sm" className="btn-new">New</Button></Card.Header>
                <Card.Body className="roles-card-body">
                    <Card.Text className="roles-card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo nunc a lectus sodales cursus.
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
                                        return <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <a href="/users/roles/view"><img src={ViewIcon} alt="View Icon" className="viewIcon" /></a>
                                                <a href="#edit"><img src={EditIcon} alt="Edit Icon" className="editIcon" /></a>
                                                <a href="#delete"><img src={DeleteIcon} alt="Delete Icon" className="deleteIcon" /></a>
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
