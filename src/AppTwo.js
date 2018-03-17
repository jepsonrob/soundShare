import React from 'react';
import Waveform from 'waveform-react';
import './App.css'
import {
	getAudioBuffer,
	getContext
} from './utils';
import Tone from 'tone';



class AppTwo extends React.Component {
		state = {

			context: null,
			user: 0,
			playState: 'stopped',
			loaded:false,

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
					pointWidth: 3
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

		/* Likely useful for future uploading
		  handleFile = event => {
		    const files = event.target.files;
		    const file = window.URL.createObjectURL(files[0]);
		    this.getFile(file);
		  };
		*/

		//We dont need this function at all to be honest
		setPosition = (val, key) => { // sets the position of the playhead
			let newAudioState = [...this.state.audio]; // Copies the array
			newAudioState[key].position = val; // adds the new buffer to the array
			this.setState({
				audio: newAudioState
			}); // sets the state accordingly
			let loopLength = Tone.Transport.loopEnd - Tone.Transport.loopStart;
			console.log(loopLength * val);

		};


		start() {
			if(this.state.loaded==true)
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
						newAudioState
					})
				}
			}, 100);
		}

		stop() {
			clearInterval(this.playheadObserver);
			Tone.Transport.stop()
		}

		pause() {
			clearInterval(this.playheadObserver);
			Tone.Transport.pause();
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
			newAudioState[key].player.loop = true;
			this.setState({
				audio: newAudioState
			}); // sets the state accordingly
			this.state.audio[key].player.sync().start(0); // syncs new player with timeline
		}

		indexOfMax(arr) { //good old stackoverflow (11301438)
			if (arr.length === 0) {
				return -1;
			}

			var max = arr[0];
			var maxIndex = 0;

			for (var i = 1; i < arr.length; i++) {
				if (arr[i] > max) {
					maxIndex = i;
					max = arr[i];
				}
			}

			return maxIndex;
		}



	render() {
			return (
		      <div>
		          <button onClick={()=>this.start()}> Play </button>
		          <button onClick={()=>this.pause()}> Pause </button>
		          <button onClick={()=>this.stop()}> Stop </button>


		          <div className='waveformContainer'>


		          {this.state.audio.map((wave, key) => 
		            <Waveform 
		            key={key}
		            buffer={wave.buffer}
		            height={wave.height}
		            markerStyle={wave.markerStyle}
		            position={wave.position}
		            responsive={wave.responsive}
		            showPosition={wave.showPosition}
		            waveStyle={wave.waveStyle}
		            width={wave.width}
		            />
		            )}

		          { /*
								Add this to make the waveform playhead 'clickable'
		          onPositionChange={(pos)=>{this.setPosition(pos, key)}}*/ 
		        	}


		          
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


					if (loadCount == this.state.audio.length) { // once all buffers are loaded - execute from here.

						console.log('thank fucking god, all loaded');
						this.setState({loaded:true})
						// This is where code goes for after buffer loading! Hurray!
						// Initialise Transport
						Tone.Transport.loop = true;
						Tone.Transport.loopStart = 0;
						// get array of buffer lengths
						console.log(bufferLengths)
						// find the longest buffer (and index!)
						let longestBufferIndex = this.indexOfMax(bufferLengths);
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



    /*


    Async stuff:

For each buffer:

    Step 1 - Grab the buffer w/ getAudioBuffer(url, context)
    Step 2 - Clone audio array, put buffer inside correct object (according to key).
    Step 3 - Set state to new audio array.
    Step 4 - Initialise the player through the new buffer state.
    Step 5 - Clone audio array again, putting the player in the correct object.
    Step 6 - Initialse all player's options (loop=true) in the cloned array
    Step 7 - Set the state to the cloned array.
    Step 8 - Sync the new player in the state to the timeline, and start at 0.







    Create array of buffer lengths.
    Find the longest buffer.
    Use this as the timeline loop.
    Get the difference between the longest loop & each other loop as a ratio.
    (currentLoop / longestLoop)
    Now the range 0-1 for the main loop is range 0-0.x for shorter loops.
    currentLoopPosition = longestLoopPosition * (currentLoop / longestLoop)
    However! This will make the currentLoopPosition 'spill over', so we need to use % 1:
    currentLoopPosition = (longestLoopPosition * (currentLoop / longestLoop)) % 1.0
    However! Because javascript has some rounding errors it's probably a good idea to multiply all this by 100.
    currentLoopPosition = ( ( (longestLoopPosition * 100) * ((currentLoop * 100) / (longestLoop * 100)) ) % 100 ) / 100;
    So now we should have the current loop position - including full loops wrapping back to 0.
    However! The master loop - dictated by the longest loop - doesn't neccesarily have smaller loops fit perfectly inside.
    This means we need to check to see if the main loop length has been reached, and reset to 0 accordingly.
    Actually, that's not the case. Because we use the longestLoopPosition variable in creating the currentLoopPosition,
    we can just let it do its magic! Hurray - we just made several playheads sync up!
    



    */


}

export default AppTwo;