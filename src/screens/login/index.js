import React from "react";
import {
    Link
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {

    return (
        <>
        <h1 className="text-center">E-VOTE</h1>
        <div className="form-wrapper login">
            <Form onSubmit={props.onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type={'text'} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>PIN</Form.Label>
                    <Form.Control type={'text'} />
                </Form.Group>
                <div className="text-center">
                    <Link to={'/identity'}><Button className="btn btn-primary">Ingresar</Button></Link>
                </div>
            </Form>
        </div>
        </>
    );
}

export default Login