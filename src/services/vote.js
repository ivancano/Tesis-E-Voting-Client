import axios from 'axios';

const VoteService = {
    vote: (params) => {
        return axios.post(process.env.REACT_APP_IDENTITY_BACKEND_URL+'/vote', params); 
    },
    getElection: (voter_id) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL+'/election-details/election-by-voter/'+voter_id); 
    }
}

export default VoteService