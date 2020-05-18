import React, { useState, useEffect } from 'react';
import './style.css';
import View from './../../assets/img/eye.svg';
import Edit from './../../assets/img/edit.svg';
import Delete from './../../assets/img/trash.svg';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import api from '../../services/api';

export default function Roles() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const result = await api.get('users');
            //const result = await api.get('roles');
            setData(result.data);
            console.log(result)
        };
        GetData();
    }, []);

    return (
        <div className="roles">
            <Card className="roles-card">
                <Card.Header as="h5">Roles List</Card.Header>
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
                                    data.map((item, idx) => {
                                        return <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <a href="#view"><img src={View} alt="View Icon" className="view" /></a>
                                                <a href="#edit"><img src={Edit} alt="Edit Icon" className="edit" /></a>
                                                <a href="#delete"><img src={Delete} alt="Delete Icon" className="delete" /></a>
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
