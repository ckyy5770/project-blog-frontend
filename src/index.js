import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './antd.min.css';
import './bootstrap.min.css';
import './style.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
