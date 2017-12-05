import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import * as log from 'loglevel';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
