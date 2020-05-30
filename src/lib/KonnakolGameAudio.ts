import * as Tone from "tone"
import { KonnakolMelody } from "./KonnakolMelody"
import { Melody } from "./DataModels"

// size of playing sequence, constant for now
const SEQUENCE_SIZE = 8
// Our set of drum notes with mp3
const DRUM_NOTES = {
	"Ride": "/assets/audio/drumvox/ride.mp3",
	"HH": "/assets/audio/drumvox/hh.mp3",
	"Kick": "/assets/audio/drumvox/kick.mp3",
	"Snare": "/assets/audio/drumvox/snare.mp3",
}

export class KonnakolGameAudio {
	private drumPlayers: Tone.Players
	private bpm = 60
	private melody: KonnakolMelody

	private sequenceEvents: number[] = []
	private Sequencer: Tone.Sequence<number>

	constructor(melody: Melody, bpm: number) {
		this.melody = melody
		this.bpm = bpm

		// generate sequencer events
		for (var i = 0; i < melody.beats.length; i++) {
			this.sequenceEvents.push(i)
		}

		// load players
		this.drumPlayers = new Tone.Players(DRUM_NOTES, () => {
			this.drumPlayers.volume.value = -10
			this.drumPlayers.toDestination()
		})

		Tone.Transport.bpm.value = this.bpm

		console.log("KonnakolGameAudio.constructor", DRUM_NOTES, this.sequenceEvents, this.bpm)

		// create sequencer
		this.Sequencer = new Tone.Sequence((time, beat) => {

			console.log("KonnakolGameAudio.sequencerCallback", time, beat)

			let melodyBeat = this.melody.beats[beat]
			this.playNotes(melodyBeat.notes, time)
		}, this.sequenceEvents, "16n")
	}

	private initSequencer() {

	}

	public destroy() {
		this.stop()
		Tone.Transport.stop()
		this.Sequencer.clear()
		this.Sequencer.dispose()
	}

	public play() {
		console.log("KonnakolGameAudio.play", this.bpm, Tone.Transport, this.Sequencer)

		Tone.Transport.bpm.value = this.bpm

		Tone.Transport.start()
		this.Sequencer.start("16n", 0)

	}

	public playWithPreCount(onStart: () => void) {
		console.log("KonnakolGameAudio.playWithPreCount", Tone.Transport.state)

		// capture audio context
		Tone.start().then(() => {
			// stop in case it was playing
			if (Tone.Transport.state == "stopped")
				Tone.Transport.start()

			// let sampler = new Tone.Sampler({
			// 	"C3": "/assets/audio/drumvox/snare.mp3"
			// }, () => {
			// 	let time = Tone.Transport.now()
			// 	let measureTime = 60 / this.bpm

			// 	console.log("Ta", time)
			// 	sampler.triggerAttackRelease("C3", "4n", time) 
			// 	//this.drumPlayers.player("Snare").start(time, 0) // Takadimi
			// 	time += measureTime

			// 	console.log("Ta", time)
			// 	sampler.triggerAttackRelease("C3", "4n", time)
			// 	//this.drumPlayers.player("Snare").start(time, 0) // Takadimi
			// 	time += measureTime

			// 	console.log("TaKa", time)
			// 	sampler.triggerAttackRelease("C3", "8n", time)
			// 	//this.drumPlayers.player("Snare").start(time, 0) // TaKa
			// 	time += measureTime / 2

			// 	console.log("TaKa", time)
			// 	sampler.triggerAttackRelease("C3", "8n", time)
			// 	//this.drumPlayers.player("Snare").start(time, 0) // Taka
			// 	time += measureTime / 2

			// 	console.log("TaKa", time)
			// 	sampler.triggerAttackRelease("C3", "8n", time)
			// 	//this.drumPlayers.player("Snare").start(time, 0) // Taka
			// 	time += measureTime / 2

			// 	console.log("TaKa", time)
			// 	sampler.triggerAttackRelease("C3", "8n", time)
			// 	//this.drumPlayers.player("Snare").start(time, 0) // Taka
			// 	time += measureTime / 2

			// 	console.log("Play", time)
			// 	this.Sequencer.start(time, 0)

			// 	Tone.Draw.schedule(() => {

			// 		onStart()
			// 	}, time)
			// }).toDestination()



			// schedule drums
			let time = Tone.Transport.now()
			let measureTime = 60 / this.bpm
			let snare = this.drumPlayers.player("Snare")

			console.log("Ta", time)
			snare.start(time, 0) // Takadimi
			time += measureTime

			console.log("Ta", time)
			snare.start(time, 0) // Takadimi
			time += measureTime

			console.log("TaKa", time)
			snare.start(time, 0) // TaKa
			time += measureTime / 2

			console.log("TaKa", time)
			snare.start(time, 0) // Taka
			time += measureTime / 2

			console.log("TaKa", time)
			snare.start(time, 0) // Taka
			time += measureTime / 2

			console.log("TaKa", time)
			snare.start(time, 0) // Taka
			time += measureTime / 2

			console.log("Play", time, this.Sequencer)

			Tone.Draw.schedule(() => {
				this.Sequencer.start("16n", 0)
			}, time - 0.25)

			Tone.Draw.schedule(() => {
				onStart()
			}, time)

			// this.Sequencer.start()
			// onStart()
		})
	}

	public pause() {
		console.log("KonnakolGameAudio.pause", this.bpm)

		// pause or stop all
		Tone.Transport.pause()
		this.drumPlayers.stopAll()
	}

	public stop() {
		console.log("KonnakolGameAudio.stop")

		// stop all
		Tone.Transport.stop()
		this.Sequencer.stop()

		this.drumPlayers.stopAll()
	}

	public changeBPM(newBpm: number) {
		this.bpm = newBpm
		Tone.Transport.bpm.value = newBpm
	}

	private playNotes(notes: string[], time: number) {
		if (notes.length > 0) {
			for (var note of notes) {
				console.log("KonnakolGameAudio.playNote", note, time)
				this.drumPlayers.player(note).start(time, 0)
			}
		}
	}
}