import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import './style.css';

export default function View(props) {

    const [submission, setSubmission] = useState([]);
    const [submissionDate, setSubmissionDate] = useState([]);

    useEffect(() => {
        const getSubmission = async () => {
            const result = await api.get('submissions/' + props.match.params.id);
            setSubmission(result.data.data);
            setSubmissionDate(formatDate(result.data.data.created_at))
        };
        getSubmission();

    }, [props.match.params.id]);

    function formatDate(serverDate) {
        const date = new Date(serverDate)
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false})
        const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute },, { value: second}] = dateTimeFormat.formatToParts(date)
        return(`${year}/${month}/${day} ${hour}:${minute}:${second}`)
    }

    return (
        <div className="view-submission">
            <Card className="view-submission-card">
                <Card.Header>
                    <Link to="/management-submissions/submissions" className="nav-link">
                        <img src='/img/arrowLeft.svg' alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>View Submission</h5>
                </Card.Header>
                <Card.Body className="view-submission-card-body">
                    <div className="view-submission-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr >
                                    <th>ID</th>
                                    <td>{submission.id}</td>
                                </tr>
                                <tr >
                                    <th>First Name</th>
                                    <td>{submission.first_name}</td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td>{submission.last_name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{submission.email}</td>
                                </tr>
                                <tr>
                                    <th>Institution</th>
                                    <td>{submission.institution}</td>
                                </tr>
                                <tr>
                                    <th>Department</th>
                                    <td>{submission.department}</td>
                                </tr>
                                <tr>
                                    <th>Position</th>
                                    <td>{submission.position}</td>
                                </tr>
                                <tr>
                                    <th>Observations</th>
                                    <td>{submission.observations}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{submissionDate}</td>
                                </tr>
                                <tr>
                                    <th>File</th>
                                    <td>
                                        <a href={submission.filename}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
