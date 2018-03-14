import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
    	<div>
        <h1> Log in </h1>
        <Link to='/'> Back </Link>

        </div>
    );
  }
}

export default Login;
