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

    function formatDate(serverDate) {
        const date = new Date(serverDate)
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false})
        const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute },, { value: second}] = dateTimeFormat.formatToParts(date)
        return(`${year}/${month}/${day} ${hour}:${minute}:${second}`)
    }

    return (
        <div className="submissions">
            <Card className="submissions-card">
                <Card.Header>
                    <h5>Submissions List</h5>
                    <div className="header-icons">
                        <Link to="/management-submissions/submissions/create" className="nav-link">
                            <img src='/img/add.svg' alt="Add Icon" className="iconAdd" />
                        </Link>
                    </div>
                </Card.Header>
                <Card.Body className="submissions-card-body">
                    <div className="submissions-table">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Institution</th>
                                    <th>Department</th>
                                    <th>Position</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    submissions.map((item, idx) => {
                                        return <tr key={item.id}>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.institution}</td>
                                            <td>{item.department}</td>
                                            <td>{item.position}</td>
                                            <td>{formatDate(item.created_at)}</td>
                                            <td>
                                                <Link to={{ pathname: `/management-submissions/submissions/view/${item.id}` }} className="nav-link">
                                                    <img src='/img/eye.svg' alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to={{ pathname: `/management-submissions/submissions/edit/${item.id}` }} className="nav-link">
                                                    <img src='/img/edit.svg' alt="Edit Icon" className="iconEdit" />
                                                </Link>
                                                <img
                                                    className="iconDelete"
                                                    src='/img/trash.svg' alt="Delete Icon"
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
