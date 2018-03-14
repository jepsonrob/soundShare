
/*	*	*	*	*	*	*	*	*	*	*	

Major Web Service To Do:

Front End:

Audio:
render waveform
Figure out how to put the web audio API into state
	(Note: Issue playing more than once. Something about having to destroy/create audio nodes)
How to pause
Merging waveform and playhead accordingly
If using tone js, marry everything up to global transport
Solo / Mute

Priviledge rendering:
Show / hide features according to what 


Back-end:
(see if there's some easy npm stuff for this)
Login & Auth:
	Store Email / Username / First Name / Last Name / Password(complex) / Date of Birth / IP Address / Token
	Make sure to AJAX out and store everything! 
	3 Priv levels:
		- User (can edit their own stuff only)
		- Host (can edit stuff in the session they are hosting) 
		- Admin (can edit every session)

Database stuff:

	User Information table:
MemberID / Email / Username / First Name / Last Name / Password(complex) / Date of Birth / Priviledge

	User Activity table:
MemberID / timestamp / IP address / action / 

	Audio table:



Sessions table

Identifier(token) / Host / User1 / User2 / User3 / User4 / Created(timestamp) / 


Uploading:
Drag/drop with file, HTML form.
	User - Timestamp - Genre - Tempo - Key - Description - Token(hidden/cookie)
Take this information, sanitize accordingly (how to check if it is audio? SQL Inject avoid/etc.).
Check user priviledge level to make sure they are editing correct
Name & save uploaded file to the audio folder for that user.
Store file name/location (and all other given information above) in database.

History:
Check user / permissions

Get upload information from database
Convert to JSON API Structure
Send as AJAX



General Notes:

Login & Authentication:
User given a rng token on succesful login, use this to validate that it is them server side.
Token is attached to specific account in database to check whenever they perform a sensitive action.

Front-end audio: 
Playing 5 samples at the same time, not going out of time.
Tests will need to be run to see if Tone.js is capable of this. I don't see why not!
Make a pause, play and stop button playing 5 audio tracks.

Serving up audio with Node.js:
What mechanism will we use to download the correct samples to the client?
A database with filenames & information seems like the best idea:
when the application loads (server side), it queries the database to get a full report of
information on the files. This information is transmitted (JSON) to the client,
and tone.js's deals with it accordingly.
This setup allows us to work with the history, too.

Waveforms:
https://github.com/katspaugh/wavesurfer.js
Hopefully this will answer my problems with this. Otherwise we'll be looking for others!

React / Front-end view (/ Routes):

Header:
	<h1> Title </h1>
	<audioControls />
	<Link>
		Login
	</Link>

Audio View/Route:
	<header />
	<audioPlayer />
	<audioPlayer />
	<audioPlayer />
	<audioPlayer />
	<audioPlayer />

Upload View/Route:
	<header />
	<h2> Upload </h2>
	<dragDrop />
	<form>
		<input type="text" name="genre">
		<input type="number" name="tempo" value={this.props.tempo}>
		<input type="text" name="genre">
		<input type="submit" value="Upload">
	</form>
	<loadbar />

History View/Route:
	<header />
	<h2> Upload </h2>

Login View/Route:
	<header />



Small Build for Soon with Friends:


Front-end:
(Sessions? At least URL identifiers or something.)
	Audio:
2 - render waveform (https://wavesurfer-js.org/)
DONE - Figure out how to put the web audio API (tone.js) into state
	(Note: Issue playing more than once. Something about having to destroy/create audio nodes)
3 - How to pause (not just stop!)
4 - Merging waveform and playhead accordingly
4.5 - If using tone js, marry everything up to global transport
DONE - Mute.
DONE Change Icon/colour of Mute when muted. 

Pages:
	Home / Login / Upload




Back-end:
Express Server serving front-end and audio files
Any time an audio file is uploaded it'll be put in the main /latest/ file and a copy will be put into /archive/
The files in /latest/ should always have the same names, because that might make my life way easier







*	*	*	*	*	*	*	*	*	*	*/