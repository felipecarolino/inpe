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

export default function Roles() {

    const history = useHistory();

    const [roles, setRoles] = useState([]);

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

    async function getRoles(page) {
        const result = await api.get('roles?page=' + page);
        setRoles(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    useEffect(() => {
        getRoles(currentPage);
    }, [currentPage]);

    async function deleteRole() {
        try {
            await api.delete('roles/' + id);
            setDeleteModalShow(false);
            setRoles(roles.filter(role => role.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired" || error.response.data.message === "Token not provided") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 1, "message": "Error to delete role"
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
                    Do you really want to delete this role? This process cannot be undone.
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={deleteRole}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" className="justify-content-between" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Navbar.Brand className="m-0"><strong>Roles List</strong></Navbar.Brand>
                        <Col xs="auto" className="p-0">
                            <Link to="/management/roles/create">
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
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roles.map((item, idx) => {
                                    return <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <Link to={{ pathname: `/management/roles/view/${item.id}` }} className="mr-2">
                                                <Image width="24px" src={eye} fluid />
                                            </Link>
                                            <Link to={{ pathname: `/management/roles/edit/${item.id}` }} className="mr-2">
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
                        onChange={(getRoles)}
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