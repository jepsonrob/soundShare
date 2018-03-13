import React, { Component } from 'react';
// import './src/Header.css';
import AudioControls from './AudioControls';
import { Link } from 'react-router-dom';


const context = new (window.AudioContext || window.webkitAudioContext)();
var source;


class Heading extends Component {
  constructor(props) {
      super(props);
      this.state = {
        audio: {
          playState: 'stopped', 
          position: 0,
          solo: 0,
          mute: 0,
          solod: [0,0,0,0,0],
          muted: [0,0,0,0,0],
          }
        }
    }

  render() {
    return (
        <header className="App-header">
          <img className="logo" alt="logo" />
          <h1 className="title">songShare</h1>
          <h4 className="subtitle">  Collaborative Music Platform </h4>
      
        
        <AudioControls playState={this.state.audio.playState} 
                      stopHandler={this.stopHandler.bind(this)}
                      pauseHandler={this.pauseHandler.bind(this)}
                      playHandler={this.playHandler.bind(this)}
                      />

        <Link to="/login">
          Login
        </Link>

        </header>

    )
  }

  stopHandler(e){
        e.preventDefault();

        this.setState({audio:{playState: 'stopped'} });
        source.stop(0);
  }

  playHandler(e){
        e.preventDefault();
        this.setState({audio:{playState: 'playing'} });
        this.audioRequest();
        source.start(0)
  }

  pauseHandler(e){
        e.preventDefault();
        this.setState({audio:{playState: 'paused'} });
        source.stop(0)
  }

  audioRequest(){
    source = context.createBufferSource();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'testSound.wav', true) // don't put the audio in src - put it in public!
    xhr.responseType = 'arraybuffer';


    xhr.onload = function(e){
      if (xhr.readyState === 4){ // look up this readyState thing
          if (xhr.status === 200){ // HTTP response 200 - success
          context.decodeAudioData(xhr.response, function(buffer) {
          source.buffer = buffer;
          source.connect(context.destination);
          source.loop = true;
          }, function(e){console.log(e)} );
        }
      }
  }
  xhr.send();
}

  componentDidMount(){
    this.audioRequest();
  }


}

export default Heading;
