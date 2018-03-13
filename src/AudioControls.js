import React, { Component } from 'react';
import FAPlayCircle from 'react-icons/lib/fa/play-circle';
import FAPauseCircle from 'react-icons/lib/fa/pause-circle';
import FAStopCircle from 'react-icons/lib/fa/stop-circle';


class AudioControls extends Component {
  render() {
    return (
        <div className="audioPlayer">
    		<FAPlayCircle onClick={this.props.playHandler} 
    			className={this.props.playState==='playing' ? 'playButton active' : 'playButton'} 
    			style={{cursor:'pointer'}}	/>
    		<FAPauseCircle onClick={this.props.pauseHandler} 
    			className={this.props.playState==='paused' ? 'pauseButton active' : 'pauseButton'} 
    			style={{cursor:'pointer'}}	/>
    		<FAStopCircle onClick={this.props.stopHandler} 
    			className='stopButton'
    			style={{cursor:'pointer'}}	/>
        </div>
    );
  }
}

export default AudioControls;
