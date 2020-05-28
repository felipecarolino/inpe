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

export default function Roles() {

    const [roles, setRoles] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [id, setId] = useState();

    useEffect(() => {
        const GetRoles = async () => {
            const result = await api.get('roles');
            setRoles(result.data);
        };
        GetRoles();
    }, []);

    async function deleteRole() {
        try {
            await api.delete('roles/' + id);
            setModalShow(false);
        } catch (error) {
            console.log(error);
        }
    }

    function DeleteModal(props) {
        return (
          <Modal
            {...props}
            centered
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
                    <Link to="/users/roles/create" className="nav-link">
                        <img src={IconAdd} alt="Add Icon" className="iconAdd" />
                    </Link>
                </Card.Header>
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
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <Link to={{ pathname: `/users/roles/view/${item.id}` }} className="nav-link">
                                                    <img src={IconView} alt="View Icon" className="iconView" />
                                                </Link>
                                                <Link to={{ pathname: `/users/roles/edit/${item.id}` }} className="nav-link">
                                                    <img src={IconEdit} alt="Edit Icon" className="iconEdit" />
                                                </Link>
                                                <img
                                                    className="iconDelete"
                                                    src={IconDelete} alt="Delete Icon"
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setModalShow(true);}}
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
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}
