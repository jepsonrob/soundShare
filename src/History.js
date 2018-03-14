import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class History extends Component {
  render() {
    return (
    	<div>
        <h1> History </h1>
        <Link to='/'> Back </Link>
        </div>
    );
  }
}

export default History;
