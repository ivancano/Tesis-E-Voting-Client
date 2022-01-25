import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from "react-bootstrap/Table";
import VoteService from "../../services/vote";

const Vote = (props) => {

    const [electionDetail, setElectionDetail] = useState([])
    const [candidateSelected, setCandidateSelected] = useState(null)
    const [voteSent, setVoteSent] = useState(false)

    useEffect(() => {
        const voter = JSON.parse(localStorage.getItem('voter'));
        VoteService.getElection(voter[0].id)
        .then(data => {
            setElectionDetail(data.data)
        })
    }, []);

    const selectCandidate = (e) => {
        const voter = JSON.parse(localStorage.getItem('voter'));
        const electionSelected = electionDetail.find(x => x.id == e.currentTarget.value);
        setCandidateSelected({
            'election_detail_id': electionSelected.id,
            'election_id': electionSelected.election.id,
            'parties_id': electionSelected.party.id,
            'candidate_id': electionSelected.candidate.id,
            'position': electionSelected.position,
            'voter_id': voter[0].id
        });
    }

    const vote = () => {
        if(candidateSelected !== null) {
            VoteService.vote(candidateSelected)
            .then(res => {
                if(res.data.result == 'Error') {
                    alert("Error al procesar el voto")    
                }
                else {
                    setVoteSent(true)
                }
            })
            .catch(e => {
                alert("Error al procesar el voto")
            });
        }
        else {
            alert("Debe seleccionar un candidato");
        }
    }

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
                    {electionDetail.length > 0 && electionDetail.map((i, k) => (
                            <tr>
                                <td>{i.candidate.name} {i.candidate.lastname}</td>
                                <td>{i.party.name}</td>
                                <td>{i.position}</td>
                                <td>
                                    <input type="radio" value={i.id} name="vote" onChange={selectCandidate} /> 
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {voteSent && (
                <div style={{marginTop: '20px'}}>
                    <Alert variant={'success'}>
                        Voto enviado con éxito
                    </Alert>
                </div>
            )}
            {!voteSent && (
                <div className="text-center"  style={{marginTop: '20px'}}>
                    <Button className="btn btn-primary" onClick={vote}>Votar</Button>
                </div>
            )}
        </div>
        </>
    );
}

export default Vote