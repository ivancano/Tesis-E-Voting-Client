import React, { useState } from "react";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IdentityService from "../../services/identity";

const Login = (props) => {
    const history = useHistory();
    const [dni, setDni] = useState('36431581');
    const [pin, setPin] = useState('123456');

    const validate = () => {
        IdentityService.validateVoter({dni: dni, pin: pin}).then(res => {
            if(res.data.validation && res.data.validation.voter) {
                localStorage.setItem('voter', JSON.stringify(res.data.validation.voter));
                history.push('identity');
            }
            else {
                alert('El votante no se encuentra registrado o no está habilitado para votar.')
            }
        })
        .catch(e => {
            alert('Hubo un error al procesar. Intente nuevamente.')
            console.log(e);
        })
    }

    return (
        <>
        <h1 className="text-center">E-VOTE</h1>
        <div className="form-wrapper login">
            <Form onSubmit={props.onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type={'text'} onChange={e => setDni(e.target.value)} value={dni} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>PIN</Form.Label>
                    <Form.Control type={'password'} onChange={e => setPin(e.target.value)} value={pin} />
                </Form.Group>
                <div className="text-center">
                    <Button className="btn btn-primary" onClick={validate}>Ingresar</Button>
                </div>
            </Form>
        </div>
        </>
    );
}

export default Login