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

export default function Variables() {

    const history = useHistory();
    const [submissions, setSubmissions] = useState([]);
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

    async function getSubmissions(page) {
        const result = await api.get('submissions?page=' + page);
        setSubmissions(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    useEffect(() => {
        getSubmissions(currentPage);
    }, [currentPage]);

    async function deleteSubmission() {
        try {
            await api.delete('submissions/' + id);
            setDeleteModalShow(false);
            setSubmissions(submissions.filter(submission => submission.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 1, "message": "Error to delete submission"
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
                    Do you really want to delete this submission? This process cannot be undone.
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={deleteSubmission}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="submissions">
            <Card className="submissions-card">
                <Card.Header>
                    <h5>Submissions List</h5>
                    <div className="header-icons">
                        <Link to="/management-submissions/submissions/create" className="nav-link">
                            <img src={IconAdd} alt="Add Icon" className="iconAdd" />
                        </Link>
                    </div>
                </Card.Header>
                <Card.Body className="submissions-card-body">
                    <div className="submissions-table">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>RA</th>
                                    <th>DEC</th>
                                    <th>Orb_Per</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    submissions.map((item, idx) => {
                                        return <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.ra}</td>
                                            <td>{item.dec}</td>
                                            <td>{item.per}</td>
                                            <td>
                                                <Link to={{ pathname: `/management-submissions/submissions/view/${item.id}` }} className="nav-link">
                                                    <img src={IconView} alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to={{ pathname: `/management-submissions/submissions/edit/${item.id}` }} className="nav-link">
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

            <div className="submissions-pagination">
                <Pagination
                    hideDisabled
                    activePage={currentPage}
                    itemsCountPerPage={totalPageItems}
                    totalItemsCount={totalItems}
                    onChange={(getSubmissions)}
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
