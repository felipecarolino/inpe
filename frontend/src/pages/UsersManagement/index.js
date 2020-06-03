import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import IconView from './../../assets/img/eye.svg';
import IconEdit from './../../assets/img/edit.svg';
import IconDelete from './../../assets/img/trash.svg';
import IconAdd from './../../assets/img/add.svg';

import './style.css';

export default function UsersManagement() {

    const [users, setusers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [id, setId] = useState();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")

    useEffect(() => {
        const Getusers = async () => {
            const result = await api.get('users');
            setusers(result.data);
        };
        Getusers();
    }, []);

    async function deleteUser() {
        try {
            await api.delete('users/' + id);
            setModalShow(false);
            setusers(users.filter(user => user.id !== id))
        } catch (error) {
            setErrorsList([
                {
                    "id": 1, "message": "Error to delete user"
                }
            ]);

            setClassErros("block");
        }
    }

    function DeleteModal(props) {
        return (
            <Modal
                {...props}
                centered
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this user? This process cannot be undone.
            </Modal.Body>
                <Modal.Footer>
                    <div className={"alert alert-danger " + classErrors} >
                        {[...errorsList].map((item) => (
                            <span key={item.id}>{item.message} <br /></span>
                        ))}
                    </div>
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={deleteUser}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="users">
            <Card className="users-card">
                <Card.Header>
                    <h5>Users List</h5>
                    <Link to="/users/users/create" className="nav-link">
                        <img src={IconAdd} alt="Add Icon" className="iconAdd" />
                    </Link>
                </Card.Header>
                <Card.Body className="users-card-body">
                    <div className="users-table">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((item, idx) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role.name}</td>
                                            <td>
                                                <Link to={{ pathname: `/users/users/view/${item.id}` }} className="nav-link">
                                                    <img src={IconView} alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to={{ pathname: `/users/users/edit/${item.id}` }} className="nav-link">
                                                    <img src={IconEdit} alt="Edit Icon" className="iconEdit" />
                                                </Link>
                                                <img
                                                    className="iconDelete"
                                                    src={IconDelete} alt="Delete Icon"
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setModalShow(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
            <DeleteModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setErrorsList([])
                    setClassErros("hidden")
                }}
            />
        </div>
    )
}
