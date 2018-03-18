import React, { Component } from 'react';
import FAPlayCircle from 'react-icons/lib/fa/play-circle';
import FAPauseCircle from 'react-icons/lib/fa/pause-circle';
import FAStopCircle from 'react-icons/lib/fa/stop-circle';


class AudioControls extends Component {
  render() {
    return (
        <div className="audioControls">
    		<FAPlayCircle size={30} onClick={()=>{this.props.clickHandler('play')}} 
    			className={this.props.playState==='playing' ? 'playButton active' : 'playButton'} 
    			style={{cursor:'pointer'}}	/>
    		<FAPauseCircle size={30} onClick={()=>{this.props.clickHandler('pause')}} 
    			className={this.props.playState==='paused' ? 'pauseButton active' : 'pauseButton'} 
    			style={{cursor:'pointer'}}	/>
    		<FAStopCircle size={30} onClick={()=>{this.props.clickHandler('stop')}} 
    			className='stopButton'
    			style={{cursor:'pointer'}}	/>
        </div>
    );
  }
}

export default AudioControls;
