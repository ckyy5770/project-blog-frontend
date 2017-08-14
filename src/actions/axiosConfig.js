import axios from 'axios';

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