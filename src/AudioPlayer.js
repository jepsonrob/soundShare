import React, { Component } from 'react';
import FaHeadphones from 'react-icons/lib/fa/headphones';
import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';
import FaHistory from 'react-icons/lib/fa/history';
import FaRepeat from 'react-icons/lib/fa/repeat';
import Waveform from 'waveform-react';
import './AudioPlayer.css';
import { Link } from 'react-router-dom';


class AudioPlayer extends Component {

  render() {
    return (
        <div className='playerContainer'>

        	<div className='waveformContainer'>

		            <Waveform 
		            buffer={this.props.audio.buffer}
		            height={this.props.audio.height}
		            markerStyle={this.props.audio.markerStyle}
		            position={this.props.audio.position}
		            responsive={this.props.audio.responsive}
		            showPosition={this.props.audio.showPosition}
		            waveStyle={this.props.audio.waveStyle}
		            width={this.props.audio.width}
		            />
		         
   			</div>

        	<FaHeadphones size={30} className={this.props.audio.muted ? 'muted icon' : 'icon'} style={{cursor:'pointer'}} onClick={()=>{this.props.clickHandler('mute', this.props.index) }} />
        	{ this.props.user==this.props.index ? (
        		<FaCloudUpload className='icon' size={30} />) : 
        	(<FaCloudDownload className='icon' size={30} style={{cursor:'pointer'}} />) 
        	}

        </div>
        	
    );
	}

}


export default AudioPlayer;
