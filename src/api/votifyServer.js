
// NODE MODULES
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    'Content-Type': 'application/json',
    withCredentials: true // otherwise we cannot get the session cookies from the server
});

export default instance;
// TODO Remove localhost with the real domain address.