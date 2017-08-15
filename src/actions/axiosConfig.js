import axios from 'axios';

//export const API_URL = 'http://127.0.0.1:6001';
export const API_URL = 'https://react-blog-backend.herokuapp.com';

axios.interceptors.request.use(function(config) {
    const user = localStorage.getItem('user');
    if(!user) return config;

    const token = JSON.parse(user).token;

    if ( token != null ) {
        config.headers['access-token'] = `${token}`;
    }

    return config;
}, function(err) {
    return Promise.reject(err);
});