import React, { Component } from 'react';
import FaHeadphones from 'react-icons/lib/fa/headphones';
import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';
import FaHistory from 'react-icons/lib/fa/history';
import Waveform from 'waveform-react';
import './AudioPlayer.css';
import { Link } from 'react-router-dom';


class AudioPlayer extends Component {
	// Need to figure out how to compare this.props.user and this.props.newkey somehow.

  render() {
    return (
        <div className='playerContainer'>
        	<div className={this.props.classy + ' audioPlayer'}>
        	<p> Please do me a favour and imagine a waveform here </p>
        	</div>
        	<FaHeadphones size={30} className={this.props.muted ? 'muted muteIcon' : 'muteIcon'} style={{cursor:'pointer'}} onClick={()=>{this.props.muter(this.props.newkey) }} />
        	{ this.props.userTrack ? (
        		<Link to='/upload'><FaCloudUpload className='cloudIcon' size={30} /></Link>) : 
        	(<FaCloudDownload className='cloudIcon' size={30} style={{cursor:'pointer'}} />) 
        	}

        </div>
        	
    );
	}

}


export default AudioPlayer;
