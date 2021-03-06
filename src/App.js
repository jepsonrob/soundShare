import React from 'react';
import './App.css'
import {
	getAudioBuffer,
	getContext,
	indexOfMax
} from './utils';
import Tone from 'tone';
import AudioPlayer from './AudioPlayer';
import AudioControls from './AudioControls';


class App extends React.Component {
		state = {

			context: null,
			user: 0,
			playState: 'stopped',
			loaded:false,
			globalTempo: 120,

			audio: [{
				buffer: null,
				player: null,
				height: 150,
				width: 900,
				markerStyle: {
					color: '#888',
					width: 2
				},
				position: 0,
				responsive: true,
				showPosition: true,
				waveStyle: {
					color: '#FFA051',
					animate: true,
					plot: 'line',
					pointWidth: 1
				},
				muted: false,
				url: '/audio/ambience.mp3',
				bufferRatio:null,
				bufferLength:null,
				tempo: 120,
			}, {
				buffer: null,
				player: null,
				height: 150,
				width: 900,
				markerStyle: {
					color: '#888',
					width: 2
				},
				position: 0,
				responsive: true,
				showPosition: true,
				waveStyle: {
					color: '#4B5AB8',
					animate: true,
					plot: 'bar',
					pointWidth: 1
				},
				muted: false,
				url: '/audio/loopOne.mp3',
				bufferRatio:null,
				bufferLength:null,				
				tempo: 120,

			}, {
				buffer: null,
				player: null,
				height: 150,
				width: 900,
				markerStyle: {
					color: '#888',
					width: 2
				},
				position: 0,
				responsive: true,
				showPosition: true,
				waveStyle: {
					color: '#43D243',
					animate: true,
					plot: 'line',
					pointWidth: 1
				},
				muted: false,
				url: '/audio/loopTwo.mp3',
				bufferRatio:null,
				bufferLength:null,
				tempo: 120,

			}, {
				buffer: null,
				player: null,
				height: 150,
				width: 900,
				markerStyle: {
					color: '#888',
					width: 2
				},
				position: 0,
				responsive: true,
				showPosition: true,
				waveStyle: {
					color: '#FF5151',
					animate: true,
					plot: 'line',
					pointWidth: 1
				},
				muted: false,
				url: '/audio/loopThree.mp3',
				bufferRatio:null,
				bufferLength:null,
				tempo: 120,

			}, {
				buffer: null,
				player: null,
				height: 150,
				width: 900,
				markerStyle: {
					color: '#888',
					width: 2
				},
				position: 0,
				responsive: true,
				showPosition: true,
				waveStyle: {
					color: '#FFFC5E',
					animate: true,
					plot: 'line',
					pointWidth: 1
				},
				muted: false,
				url: '/audio/loopFour.mp3',
				bufferRatio:null,
				bufferLength:null,
				tempo: 120,
			}]

		};

		componentWillMount() {
			const context = getContext();
			this.setState({
				context
			});
		}

		clickHandler(control, track){
			switch(control){
				case 'play':
					this.start()
					break;
				case 'stop':
					this.stop();
					break;
				case 'pause':
					this.pause();
					break;
				case 'mute':
					this.muteTrack(track);
					break;
			}
		}

		start() {
			if(this.state.loaded===true)
			this.setState({
				playState: 'playing'
			})
			Tone.Transport.start()
			//start the playhead monitor
			this.playheadObserver = setInterval(() => {
				for (let x = 0; x < this.state.audio.length; x++) {
					let currentPosition = Tone.Transport.progress * this.state.audio[x].bufferRatio
					let newAudioState = this.state.audio;
					newAudioState[x].position = currentPosition % 1;					
					this.setState({
						audio: newAudioState
					})
				}
			}, 100);
		}

		stop() {
			this.setState({playState: 'stopped'})
			Tone.Transport.stop();
			for (let x = 0; x < this.state.audio.length; x++) {
					let newAudioState = this.state.audio;
					newAudioState[x].position = 0;					
					this.setState({
						audio: newAudioState
					})
				}
			clearInterval(this.playheadObserver);

		}

		pause() {
			this.setState({playState: 'paused'})
			Tone.Transport.pause();
			clearInterval(this.playheadObserver);

		}

		audioInit = async (key) => { // grabs the file through some async magic
			const buffer = await getAudioBuffer(this.state.audio[key].url, this.state.context); // fills audio buffer with audio info
			let newAudioState = [...this.state.audio]; // Copies the array
			newAudioState[key].buffer = buffer; // adds the new buffer to the array
			this.setState({
				audio: newAudioState
			}); // sets the state accordingly
			// create tone player using newly set state.buffer
			let player = new Tone.Player(this.state.audio[key].buffer).toMaster();
			// and do the whole thing again! 
			newAudioState = [...this.state.audio]; // Copies the whole array again
			newAudioState[key].player = player; // adds the new player to the object
			// Below - turning on looping on specific clips. Could be a useful feature!
			// newAudioState[key].player.loop = true;
			// Below - it is possible to modify the speed of playback. This will be useful for a 'sync' feature.
			// newAudioState[key].player.playbackRate = 0.5
			this.setState({
				audio: newAudioState
			}); // sets the state accordingly
			this.state.audio[key].player.sync().start(0); // syncs new player with timeline
		}


	muteTrack(toggledTrack){
		let newAudioState = [...this.state.audio];
		newAudioState[toggledTrack].muted = !this.state.audio[toggledTrack].muted;
		newAudioState[toggledTrack].player.mute = !this.state.audio[toggledTrack].player.mute;
    this.setState({audio: newAudioState});
  }

 



	render() {
			return (
		      <div>
		      		<AudioControls playState={this.state.playState} clickHandler={(click)=>this.clickHandler(click)} />

		          <div className='interfaceContainer'>

		          {this.state.audio.map((wave, index) => 
		            <AudioPlayer 
		            	audio={wave} 
		            	user={this.state.user} 
		            	index={index} 
		            	key={index}
		            	clickHandler={(click, track)=>this.clickHandler(click, track)} 
		            />

		          )}



		          
		          </div>
		      </div>
    );
  }

	componentDidMount() {
		let audioState = this.state.audio;
		let bufferLengths = []


		for (let x = 0; x < audioState.length; x++) {
			bufferLengths[x] = 0;

			if (!audioState[x].buffer) { // if buffer doesn't exist: initial load!
				this.audioInit(x).then((response) => { // initialise audio number x in loop
					let loadCount = 0; // set loadCount to 0 for each iteration
					bufferLengths[x] = this.state.audio[x].buffer.duration; // add duration to bufferLengths array.

					this.state.audio.forEach((element) => { // check to see how many are loaded so far.
						if (element.buffer) { // if buffer in this loop exists
							loadCount++; // add to loadCount
						} // When the final buffer is fully loaded, loadCount will be at the same length as the audioState array!
					}); //end forEach


					if (loadCount === this.state.audio.length) { // once all buffers are loaded - execute from here.

						console.log('thank fucking god, all loaded');
						this.setState({loaded:true})
						// This is where code goes for after buffer loading! Hurray!
						// Initialise Transport
						Tone.Transport.loop = true;
						Tone.Transport.loopStart = 0;
						// get array of buffer lengths
						console.log(bufferLengths)
						// find the longest buffer (and index!)
						let longestBufferIndex = indexOfMax(bufferLengths);
						let longestBuffer = bufferLengths[longestBufferIndex];
						// set the Transport length to the longest buffer
						Tone.Transport.loopEnd = longestBuffer;
						// Get the difference between the longest loop & each other loop as a ratio.
						let bufferRatios = bufferLengths.map((element)=>longestBuffer/element);
						console.log('bufferRatios: ', bufferRatios); // check to make sure maths is right
						// set the state so everyone can use this information! Hurray!
						let newAudioState = [...this.state.audio];
						newAudioState.forEach((element, index)=>{
							element.bufferRatio = bufferRatios[index];
							element.bufferLength = bufferLengths[index];
						})

						this.setState({audio:newAudioState});

					} else {
						console.log('not fully loaded yet...');
					}
				}) // end then
			} // end buffer check



		} // end main For
	} // end componentDidMount

}

export default App;