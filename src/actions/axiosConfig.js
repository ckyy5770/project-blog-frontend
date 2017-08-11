import axios from 'axios';

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');

    if ( token != null ) {
        config.headers['access-token'] = `${token}`;
    }

    return config;
}, function(err) {
    return Promise.reject(err);
});