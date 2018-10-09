import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import api from './Api';

ReactDOM.render(<App api={api}/>, document.getElementById('root'));