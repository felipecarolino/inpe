import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';

export default function FileUpload() {

    
    const [submission_id, setSubmissionId] = useState(0);
    const [file, setFile] = useState('');
   
    const handleSave = (e) => {

        e.preventDefault();

        const data = new FormData() 

       

        data.append('file', file)
        data.append('submission_id', submission_id)
        console.warn(file);
        let url = "http://45.79.47.218/cvportal/backend/api/submissions/FileUpload";
              

        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.warn(res);
            
        })

    }

  

    return (
        <>
        <div>
            <Form onSubmit={handleSave}>
                    <Form.Row>
                        <Form.Group controlId="roleName">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ID"
                                value={submission_id}
                                onChange={(e) => setSubmissionId(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="roleDescription">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit" >Sent</Button>
                </Form>
            </div>
            </>
                
               
    );
}