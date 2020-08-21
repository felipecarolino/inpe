import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Pagination from "react-js-pagination";

import { logout } from "../../services/auth";

import './style.css';

export default function UsersManagement() {

    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [id, setId] = useState();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    async function GetUsers(page) {
        const result = await api.get('users?page=' + page);
        setUsers(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    useEffect(() => {
        GetUsers(currentPage);
    }, [currentPage]);

    async function deleteUser() {
        try {
            await api.delete('users/' + id);
            setModalShow(false);
            setUsers(users.filter(user => user.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired") {
                Logout();
            }
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
                    <Link to="/user-management/users/create" className="nav-link">
                        <img src='/img/add.svg' alt="Add Icon" className="iconAdd" />
                    </Link>
                </Card.Header>
                <Card.Body className="users-card-body">
                    <div className="users-table">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
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
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role.name}</td>
                                            <td>
                                                <Link to={{ pathname: `/user-management/users/view/${item.id}` }} className="nav-link">
                                                    <img src='/img/eye.svg' alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to={{ pathname: `/user-management/users/edit/${item.id}` }} className="nav-link">
                                                    <img src='/img/edit.svg' alt="Edit Icon" className="iconEdit" />
                                                </Link>
                                                <img
                                                    className="iconDelete"
                                                    src='/img/trash.svg' alt="Delete Icon"
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

            <div className="users-pagination">
                <Pagination
                    hideDisabled
                    activePage={currentPage}
                    itemsCountPerPage={totalPageItems}
                    totalItemsCount={totalItems}
                    onChange={GetUsers}
                />
            </div>

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
