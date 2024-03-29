import * as Tone from 'tone'
import { KonnakolMelody } from './DataModels'
import { GameFeedbackCollector } from './GameFeedback'
import { Draw } from 'tone/build/esm/core'
import { AppContext, PlayerState } from '../AppContext'

// size of playing sequence, constant for now
const SEQUENCE_SIZE = 8

// Our set of drum notes with mp3
const DRUM_NOTES = {
	'Ride': '/assets/audio/drumvox/ride2.mp3',
	'HH': '/assets/audio/drumvox/hh.mp3',
	'Kick': '/assets/audio/drumvox/kick.mp3',
	'Snare': '/assets/audio/drumvox/snare2.mp3',
}

export class KonnakolGameAudio {
	private drumPlayers: Tone.Players
	private bpm = 60
	private melody: KonnakolMelody
	private melodyPlayCounter = 0

	private sequenceEvents: number[] = []
	private Sequencer: Tone.Sequence<number>
	private gameFeedback: GameFeedbackCollector
	private scheduleOnStart?: Draw
	public startedMainLoop = false

	public PRECOUNT_LENGTH = 4000

	constructor(melody: KonnakolMelody, bpm: number) {
		this.melody = melody
		this.bpm = bpm

		this.gameFeedback = new GameFeedbackCollector(this.melody.id!, this.melody.collection_id!)

		// generate sequencer events
		for (let i = 0; i < melody.beats.length; i++) {
			this.sequenceEvents.push(i)
		}

		// load players
		this.drumPlayers = new Tone.Players(DRUM_NOTES, () => {
			this.drumPlayers.volume.value = -10
			this.drumPlayers.toDestination()
		})

		Tone.Transport.bpm.value = this.bpm

		console.log('KonnakolGameAudio.constructor', this.melody)

		// create sequencer
		this.Sequencer = this.initSequencer()
	}

	private initSequencer() {
		return new Tone.Sequence((time, beat) => {

			//console.log('KonnakolGameAudio.sequencerCallback', time, beat)

			const melodyBeat = this.melody.beats[beat]
			this.playNotes(melodyBeat.notes, time)

			// collect play times
			if (beat === this.melody.beats.length - 1) {
				this.melodyPlayCounter++
				//console.log('melody playCount', this.melodyPlayCounter)
			}
		}, this.sequenceEvents, '16n')
	}

	public destroy() {
		this.stop()

		Tone.Transport.stop()
		this.Sequencer.clear()
		this.Sequencer.dispose()
	}

	public play() {
		console.log('KonnakolGameAudio.play', this.bpm, Tone.Transport, this.Sequencer)
		this.startedMainLoop = true
		AppContext.Player.speedDisabled = false

		Tone.start().then(() => {
			Tone.Transport.bpm.value = this.bpm

			Tone.Transport.start()
			this.Sequencer.start()
			this.gameFeedback.startTimer(this.bpm)
		})
	}

	public playWithPreCount(onStart: () => void) {
		console.log('KonnakolGameAudio.playWithPreCount', Tone.Transport.state)
		this.startedMainLoop = false
		// disable bpm control
		AppContext.Player.speedDisabled = true

		// capture audio context
		Tone.start().then(() => {
			// stop in case it was playing
			if (Tone.Transport.state == 'stopped')
				Tone.Transport.start()

			// schedule drums
			let transportTime = Tone.Transport.now()
			const firstTime = transportTime
			const measureTime = 60 / this.bpm
			const snare = this.drumPlayers.player('Snare')

			console.log('Ta on', transportTime)
			snare.start(transportTime, 0) // Takadimi
			transportTime += measureTime

			console.log('Ta on', transportTime)
			snare.start(transportTime, 0) // Takadimi
			transportTime += measureTime

			console.log('TaKa on', transportTime)
			snare.start(transportTime, 0) // TaKa
			transportTime += measureTime / 2

			console.log('TaKa on', transportTime)
			snare.start(transportTime, 0) // Taka
			transportTime += measureTime / 2

			console.log('TaKa on', transportTime)
			snare.start(transportTime, 0) // Taka
			transportTime += measureTime / 2

			console.log('TaKa on', transportTime)
			snare.start(transportTime, 0) // Taka
			transportTime += measureTime / 2

			console.log('Play', transportTime)

			// start the sequencer
			this.Sequencer.start(transportTime - firstTime, 0)

			// schedule start just before music start
			this.scheduleOnStart = Tone.Draw.schedule(() => {
				console.log('Tone.Draw.schedule')
				//do DOM here
				this.startedMainLoop = true
				onStart()
				// undisable speed controls
				AppContext.Player.speedDisabled = false
			}, transportTime)

			this.gameFeedback.startTimer(this.bpm)
		})
	}

	public pause() {
		console.log('KonnakolGameAudio.pause', this.bpm)
		// pause
		Tone.Transport.pause()
		this.drumPlayers.stopAll()
		this.scheduleOnStart?.cancel()

		AppContext.Player.speedDisabled = false

		this.gameFeedback.stopAndSaveHistory()
	}

	public stop() {
		console.log('KonnakolGameAudio.stop')

		// stop all
		Tone.Transport.stop()
		this.Sequencer.stop()
		this.drumPlayers.stopAll()
		this.scheduleOnStart?.cancel()

		AppContext.Player.speedDisabled = false

		// collect feedback
		this.gameFeedback.stopAndSaveHistory()
		this.gameFeedback.countMelody(this.melodyPlayCounter)
		this.melodyPlayCounter = 0
	}

	public changeBPM(newBpm: number) {
		this.bpm = newBpm
		Tone.Transport.bpm.value = newBpm

		this.stop()

		// restart playing
		if (AppContext.Player.state == PlayerState.Playing){
			this.play()
		}
		
		this.gameFeedback.startTimer(this.bpm)

	}

	private playNotes(notes: string[], time: number) {
		if (notes.length > 0) {
			for (const note of notes) {
				this.drumPlayers.player(note).start(time, 0)
			}
		}
	}
}