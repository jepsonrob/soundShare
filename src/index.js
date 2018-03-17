import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getContext } from './utils'

require("babel-polyfill");



ReactDOM.render(
		<App />,
	document.getElementById('root'));
registerServiceWorker();