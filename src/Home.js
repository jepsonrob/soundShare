import React, { Component } from 'react';
// import './src/Header.css';
import AudioControls from './AudioControls';
import AudioPlayer from './AudioPlayer';
import { Link } from 'react-router-dom';
import Tone from 'tone';


// var one,two,three,four,five;

class Heading extends Component {
  constructor(props) {
    super(props);

    this.state = {
        playState: 'stopped', 
        position: 0,
        muted: [0,0,0,0,0],
        selectedUrl: ['/audio/ambience.mp3', '/audio/loopOne.mp3', '/audio/loopTwo.mp3', '/audio/loopThree.mp3', '/audio/loopFour.mp3'],
      }

    // I've been struggling with a better way of doing this, so for first prototype I'll just do it a non-elegant way that works.
    // So far I've tried using Tone.Multiplayer, Tone.Players, Tone.Buffers & vanilla web audio. 
    this.state.one = new Tone.Player({
      "url" : this.state.selectedUrl[0],
      "loop" : true
    }).toMaster();
    this.state.two = new Tone.Player({
      "url" : this.state.selectedUrl[1],
      "loop" : true
    }).toMaster();
    this.state.three = new Tone.Player({
      "url" : this.state.selectedUrl[2],
      "loop" : true
    }).toMaster();
    this.state.four = new Tone.Player({
      "url" : this.state.selectedUrl[3],
      "loop" : true
    }).toMaster();
    this.state.five = new Tone.Player({
      "url" : this.state.selectedUrl[4],
      "loop" : true
    }).toMaster();


    this.state.muteTrack = function(toggled){
      console.log('muteTrack called');
    if(this.state.muted[toggled]){ // If already muted...
      console.log('if already muted');

      let tempMutedArray = this.state.muted; // create temp array to not mess with the state too hard!
      tempMutedArray[toggled] = 0; // unmute
      this.setState({muted:tempMutedArray}) // change state to reflect this
      this.state.muter(toggled, false); // call the muter function to change audio.

    } else if(!this.state.muted[toggled]){ // If not muted...
      console.log('if not muted...');

      let tempMutedArray = this.state.muted; 
      tempMutedArray[toggled] = 1;
      this.setState({muted:tempMutedArray});
      this.state.muter(toggled, true); // mutes toggled track to 
    } else {
      console.log('this shouldn\'t happen')
    }
  }.bind(this)

    this.state.muter = function(toggled, muted){ // toggled = array number
      console.log('muter called');

      for (var x=0;x<this.state.audioPlayers.length;x++){
        if (x==toggled){
          this.state.audioPlayers[toggled].mute = muted;
        }
      }
    }.bind(this)

    this.state.user = 0;

    this.state.audioPlayers = [this.state.one, this.state.two, this.state.three, this.state.four, this.state.five];

  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Link to='/'>
          <img className="logo" alt="logo" />
          </Link>
          <h1 className="title">songShare</h1>
          <h4 className="subtitle">  Collaborative Music Platform </h4>
      
        
        <AudioControls playState={this.state.playState} 
                      stopHandler={this.stopHandler.bind(this)}
                      pauseHandler={this.pauseHandler.bind(this)}
                      playHandler={this.playHandler.bind(this)}
                      />

        <Link to="/login">
          Login
        </Link>

        </header>

        <AudioPlayer buffer={this.state.two.buffer} muted={this.state.muted[0]} muter={this.state.muteTrack} newkey={0} userTrack={true} classy='one'/>
        <AudioPlayer buffer={this.state.two.buffer} muted={this.state.muted[1]} muter={this.state.muteTrack} newkey={1} classy='two'/>
        <AudioPlayer buffer={this.state.three.buffer} muted={this.state.muted[2]} muter={this.state.muteTrack} newkey={2} classy='three'/>
        <AudioPlayer buffer={this.state.four.buffer} muted={this.state.muted[3]} muter={this.state.muteTrack} newkey={3} classy='four'/>
        <AudioPlayer buffer={this.state.five.buffer} muted={this.state.muted[4]} muter={this.state.muteTrack} newkey={4} classy='five'/>

      </div>

    )
  }

  stopHandler(e){
        e.preventDefault();
        this.setState({playState: 'stopped'});
        this.stopAll()
  }

  playHandler(e){
        e.preventDefault();
        this.setState({playState: 'playing'});  
        this.playAll()      
  }

  pauseHandler(e){
        e.preventDefault();
        this.setState({playState: 'paused'});
        this.stopAll()
  }

  playAll(){
    for (var x=0;x<this.state.audioPlayers.length;x++){
      this.state.audioPlayers[x].start()
    }
  }

  stopAll(){
    for (var x=0;x<this.state.audioPlayers.length;x++){
      this.state.audioPlayers[x].stop()
    }
  }

  componentDidMount(){
  }


}

export default Heading;
