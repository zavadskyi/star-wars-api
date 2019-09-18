import React, { Component } from 'react';


import './throw-error.css'


export default class ThrowError extends Component {

  state = {
    renderError: false
  };

  render() {

    if (this.state.renderError) {
      this.foo.bar = 0;
    }
    return (
      <div className='throw-error'>
       <button className="btn btn-lg btn-warning"
       onClick={()=> this.setState({renderError: true})}>throw error</button>
      </div>
    );
  }
}
