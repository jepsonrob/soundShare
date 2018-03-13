import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Heading from './Heading';
import Home from './Home';
import Login from './Login';
import History  from './History';
import Upload from './Upload';
import { Route, HashRouter } from 'react-router-dom';




class App extends React.Component {
	render(){
		return(
			<HashRouter>
			<div>
			<Heading />
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/history" component={History} />
			<Route path="/history" component={Upload} />
			</div>
		</HashRouter>
		)
	}
}

export default App