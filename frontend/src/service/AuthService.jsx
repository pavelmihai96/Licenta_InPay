import axios from 'axios';

const API_BASE_URL = "endpoint_to_backend";

class AuthService {
    register(username, email, password) {
        return axios.post(API_BASE_URL, {username, email, password});
    }
}

export default new AuthService();