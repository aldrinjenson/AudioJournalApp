import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { ReactMic } from 'react-mic';

const propTypes = {
	// Props injected by SpeechRecognition
	transcript: PropTypes.string,
	resetTranscript: PropTypes.func,
	browserSupportsSpeechRecognition: PropTypes.bool,
	startListening: PropTypes.func,
	stopListening: PropTypes.func
};

const Dictaphone = ({
	transcript,
	resetTranscript,
	browserSupportsSpeechRecognition,
	startListening,
	stopListening,
	addNewNote
}) => {
	const [isListening, setIsListening] = useState(false)
	const [note, setNote] = useState()
	const [record, setRecord] = useState(false)
	const [audio, setAudio] = useState()
	const [title, setTitle] = useState()

	if (!browserSupportsSpeechRecognition) {
		return 'Sorry, your browser is outdated, try using the latest version of Chrome';
	}


	const handleChange = () => {
		if (!isListening) {
			startListening()
			setRecord(true)
			setIsListening(true)
		}
		else {
			stopListening()
			setRecord(false)
			setIsListening(false)
			setNote(transcript)
		}
	}

	const onStop = (recordedBlob) => {
		console.log('recordedBlob is: ', recordedBlob + 'hi there');
		console.log('hello');

		setAudio(recordedBlob.blobURL)
	}

	const handleSubmit = e => {
		e.preventDefault()
		addNewNote({
			time: new Date().toLocaleString(),
			title,
			content: note,
			audio,
		})
		setTitle('')
		setNote('')
		resetTranscript()
	}
	return (
		<div className='AddNew'>

			<h3 className='center-align'>Add New Note</h3>
			{isListening && <button className='btn green lighten-1' onClick={resetTranscript}>Reset</button>}
			<span>{transcript}</span>

			<div className="center container">
				<div className="input-field row">
					<p>Click the button to start/stop recording</p><br />
					<button onClick={handleChange} className="btn-floating green darken-1 btn-large">
						<i className="material-icons">mic</i>
					</button>
					{isListening && <p>Recording..</p>}
				</div>
				<ReactMic
					record={record}
					className="sound-wave"
					onStop={onStop}
					strokeColor="#000000"
				/>
			</div> {/*  container */}

			{
				note &&
				<div className="trancsrip green lighten-4 ">
					<form onSubmit={handleSubmit} className="input-field container">
						<input onChange={e => setTitle(e.target.value)} value={title} placeholder='Enter Title' type="text" required />
						<h4>Transcript</h4>
						<p>Make your edits here to improve the searching. If you want to continue recording, press the button again</p>
						<textarea name="transcript" onChange={e => setNote(e.target.value)} value={note} className="materialize-textarea"></textarea>
						<button className="center btn-large green lighten-1">
							<i className="material-icons right">note_add</i>
							<span>Add Note</span>
						</button>
					</form>


				</div>
			}
		</div> //addNew main div
	);
};

Dictaphone.propTypes = propTypes;

const options = {
	autoStart: false
}

export default SpeechRecognition(options)(Dictaphone);
