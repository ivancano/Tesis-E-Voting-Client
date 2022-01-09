import axios from 'axios';

const IdentityService = {
    uploadFile: (formData, filename) => {
        return axios.post(process.env.REACT_APP_IDENTITY_BACKEND_URL+'/uploader', formData); 
    },
    validateIdentity: (params) => {
        return axios.post(process.env.REACT_APP_IDENTITY_BACKEND_URL+'/validate', params); 
    },
    validateVoter: (params) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL+'/voters/login', params); 
    }
}

export default IdentityService