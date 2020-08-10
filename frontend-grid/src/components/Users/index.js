import React, { useState, useEffect } from 'react';

import { Link, useHistory } from "react-router-dom";

import { logout } from "../../services/auth";

import api from '../../services/api';

import Pagination from "react-js-pagination";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import eye from './../../assets/images/eye.svg';
import edit from './../../assets/images/edit.svg';
import deleteIcon from './../../assets/images/delete.svg';
import add from './../../assets/images/add.svg';

export default function Users() {

    const history = useHistory();

    const [users, setUsers] = useState([]);

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [id, setId] = useState();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("d-none")

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    async function getUsers(page) {
        const result = await api.get('users?page=' + page);
        setUsers(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage]);

    async function deleteUser() {
        try {
            await api.delete('users/' + id);
            setDeleteModalShow(false);
            setUsers(users.filter(user => user.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired" || error.response.data.message === "Token not provided") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 1, "message": "Error to delete user"
                },
                {
                    "id": 2, "message": error.response.data.message
                },
            ]);
            setClassErros("");
            setDeleteModalShow(false);
            setErrorModalShow(true);
        }
    }

    function ErrorModal(props) {
        return (
            <Modal
                {...props}
                centered
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"alert alert-danger " + classErrors} >
                        {[...errorsList].map((item) => (
                            <span key={item.id}>{item.message} <br /></span>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onHide}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
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
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={deleteUser}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" className="justify-content-between" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Navbar.Brand className="m-0"><strong>Users List</strong></Navbar.Brand>
                        <Col xs="auto" className="p-0">
                            <Link to="/management/users/create">
                                <Image width="24px" src={add} alt="Add Icon" />
                            </Link>
                        </Col>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
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
                                            <Link to={{ pathname: `/management/users/view/${item.id}` }} className="mr-2">
                                                <Image width="24px" src={eye} fluid />
                                            </Link>
                                            <Link to={{ pathname: `/management/users/edit/${item.id}` }} className="mr-2">
                                                <Image width="22px" src={edit} fluid />
                                            </Link>
                                            <Link to="#">
                                                <Image width="19px" src={deleteIcon} fluid
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setDeleteModalShow(true);
                                                    }}
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Pagination
                        hideDisabled
                        activePage={currentPage}
                        itemsCountPerPage={totalPageItems}
                        totalItemsCount={totalItems}
                        onChange={(getUsers)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </Col>
            </Row>
            <DeleteModal
                show={deleteModalShow}
                onHide={() => {
                    setDeleteModalShow(false)
                    setErrorsList([])
                    setClassErros("d-none")
                }}
            />
            <ErrorModal
                show={errorModalShow}
                onHide={() => {
                    setErrorModalShow(false)
                    setErrorsList([])
                    setClassErros("d-none")
                }}
            />
        </Container>
    )
}