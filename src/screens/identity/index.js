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
    const [dniFilename, setDniFilename] = useState(null);
    const [dniSrc, setDniSrc] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [faceImage, setFaceImage] = useState('');
    const [faceFilename, setFaceFilename] = useState(null);
    const [faceSrc, setFaceSrc] = useState(null);
    const [validated, setValidated] = useState(false);

    const onFileChange = event => {
        setDniImage(event.target.files[0]);
    };

    const onFileUpload = () => { 
        const formData = new FormData();
        formData.append( 
            "file", 
            dniImage, 
            dniImage.name
        );
        IdentityService.uploadFile(formData, dniImage.name).then((result) => {
            if(result.data.result == "False") {
                alert("Hubo un error al subir el archivo")
            }
            else {
                setDniSrc(URL.createObjectURL(dniImage));
                setDniFilename(result.data.filename);
            }
        });
    };

    const dataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
      
        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)
      
        return new Blob([ia], { type: mimeString })
      }

    const handleTakePhoto = (dataUri) => {
        const file = dataURIToBlob(dataUri)
        const formData = new FormData();
        formData.append('file', file, 'profile.png');
        IdentityService.uploadFile(formData, 'profile.png').then((result) => {
            if(result.data.result == "False") {
                alert("Hubo un error al subir el archivo")
            }
            else {
                setFaceImage(dataUri)
                setFaceFilename(result.data.filename);
            }
        });
        setShowCamera(false)
    }

    const validate = () => {
        IdentityService.validateIdentity({
            face: faceFilename,
            dni: dniFilename
        }).then((result) => {
            if(result.data.result == "False") {
                alert("No se ha podido validar la identidad del usuario")
            }
            else {
                setValidated(true);
            }
        });
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
                        <img style={{width: '60%', marginBottom: 15}} src={dniSrc} />
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
                            <Link to={'/vote'}><Button className="btn btn-primary">Continuar</Button></Link>
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