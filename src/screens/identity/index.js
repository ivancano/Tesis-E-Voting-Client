import React, { useState } from "react";
import {
    Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import IdentityService from '../../services/identity';

const Identity = (props) => {

    const [dniImage, setDniImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [faceImage, setFaceImage] = useState('');
    const [validated, setValidated] = useState(false);

    const onFileChange = event => {
        setDniImage(event.target.files[0]);
    };

    const onFileUpload = () => { 
        const formData = new FormData(); 
        const newName = dniImage.name;
        const arrayName = newName.split('.');
        const fileName = 'dni.'+arrayName[1];
        formData.append( 
            "myFile", 
            dniImage, 
            fileName
        );
        console.log('dni.'+arrayName[1]);
        //IdentityService.uploadDni(formData, fileName);
    };

    const handleTakePhoto = (dataUri) => {
        setFaceImage(dataUri);
        setShowCamera(false)
    }

    const validate = () => {
        setValidated(true);
    }

    return (
        <>
        {!showCamera && (
        <>
            <h1 className="text-center">Verificación de Identidad</h1>
            <div className="form-wrapper">
                <Row>
                    <Col className="identity-box">
                        <h3>DNI</h3>
                        <p>Debe subir una foto de la parte frontal de su documento nacional de identidad.</p>
                        <input type="file" onChange={onFileChange} /> 
                        <Button onClick={onFileUpload} className="btn btn-secondary">Subir</Button>
                    </Col>
                    <Col md={1}></Col>
                    <Col className="identity-box" style={{padding: 0}}>
                        {faceImage !== '' && (
                            <img className="img-face" src={faceImage} />
                        )}
                        <Button onClick={() => setShowCamera(true)} className="btn btn-secondary btn-take-picture">Tomar Foto</Button>
                    </Col>
                </Row>
                {validated && (
                    <div style={{marginTop: '20px'}}>
                        <Alert variant={'success'}>
                            Identificación validada
                        </Alert>
                        <div className="text-center">
                            <Link to={'/identity'}><Button className="btn btn-primary">Continuar</Button></Link>
                        </div>
                    </div>
                )}
                {!validated && (
                    <div className="text-center">
                        <Button className="btn btn-primary" onClick={validate}>Validar</Button>
                    </div>
                )}
            </div>
        </>
        )}
        {showCamera && (<Camera onTakePhoto={ (dataUri) => { handleTakePhoto(dataUri); } } />)}
        </>
    );
}

export default Identity