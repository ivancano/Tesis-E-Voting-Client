import axios from 'axios';

const IdentityService = {
    uploadDni: (formData, filename) => {
        axios.put(process.env.REACT_APP_BACKEND_URL+process.env.REACT_APP_BUCKET+'/'+filename, formData); 
    }
}

export default IdentityService