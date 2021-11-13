import React from "react";
import {
    Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";

const Vote = (props) => {

    return (
        <>
        <h1 className="text-center">Elecciones Presidenciales 2021</h1>
        <div className="form-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Candidato</th>
                        <th>Partido Político</th>
                        <th>Puesto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Juan Perez</td>
                        <td>Partido Justicialista</td>
                        <td>Presidente</td>
                        <td>
                            <input type="radio" value="1" name="vote" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>Jorge Arguello</td>
                        <td>Partido Obrero</td>
                        <td>Presidente</td>
                        <td>
                            <input type="radio" value="2" name="vote" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>Enrique Peralta</td>
                        <td>Partido Liberal</td>
                        <td>Presidente</td>
                        <td>
                            <input type="radio" value="3" name="vote" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>Alicia Marquez</td>
                        <td>Frente de Izquiera</td>
                        <td>Presidente</td>
                        <td>
                            <input type="radio" value="4" name="vote" /> 
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="text-center">
                <Button className="btn btn-primary">Votar</Button>
            </div>
        </div>
        </>
    );
}

export default Vote