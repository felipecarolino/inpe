import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import IconView from './../../assets/img/eye.svg';
import IconEdit from './../../assets/img/edit.svg';
import IconDelete from './../../assets/img/trash.svg';
import IconAdd from './../../assets/img/add.svg';

import Pagination from "react-js-pagination";

import { logout } from "../../services/auth";

import './style.css';

export default function Roles() {

    const history = useHistory();
    const [roles, setRoles] = useState([]);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);
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

    async function GetRoles(page) {
        const result = await api.get('roles?page=' + page);
        setRoles(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    useEffect(() => {
        GetRoles(currentPage);
    }, [currentPage]);

    async function deleteRole() {
        try {
            await api.delete('roles/' + id);
            setDeleteModalShow(false);
            setRoles(roles.filter(role => role.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired") {
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
            setClassErros("block");
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
        <div className="roles">
            <Card className="roles-card">
                <Card.Header>
                    <h5>Roles List</h5>
                    <Link to="/user-management/roles/create" className="nav-link">
                        <img src={IconAdd} alt="Add Icon" className="iconAdd" />
                    </Link>
                </Card.Header>
                <Card.Body className="roles-card-body">
                    <div className="roles-table">
                        <Table striped bordered hover>
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
                                                <Link to={{ pathname: `/user-management/roles/view/${item.id}` }} className="nav-link">
                                                    <img src={IconView} alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to={{ pathname: `/user-management/roles/edit/${item.id}` }} className="nav-link">
                                                    <img src={IconEdit} alt="Edit Icon" className="iconEdit" />
                                                </Link>
                                                <img
                                                    className="iconDelete"
                                                    src={IconDelete} alt="Delete Icon"
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setDeleteModalShow(true);
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

            <div className="roles-pagination">
                <Pagination
                    hideDisabled
                    activePage={currentPage}
                    itemsCountPerPage={totalPageItems}
                    totalItemsCount={totalItems}
                    onChange={GetRoles}
                />
            </div>

            <DeleteModal
                show={deleteModalShow}
                onHide={() => {
                    setDeleteModalShow(false)
                    setErrorsList([])
                    setClassErros("hidden")
                }}
            />
            <ErrorModal
                show={errorModalShow}
                onHide={() => {
                    setErrorModalShow(false)
                    setErrorsList([])
                    setClassErros("hidden")
                }}
            />
        </div>
    )
}
