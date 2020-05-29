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

			console.log("drums loaded", DRUM_NOTES)
		})

		// create sequencer
		this.Sequencer = new Tone.Sequence((time, beat) => {

			console.log("KonnakolGameAudio.sequencerCallback", time, beat)

			let melodyBeat = this.melody.beats[beat]
			this.playNotes(melodyBeat.notes, time)
		}, this.sequenceEvents, "16n")
	}

	public destroy() {
		this.stop()
		this.Sequencer.clear()
		this.Sequencer.dispose()
	}

	public play() {
		console.log("KonnakolGameAudio.play", this.bpm, Tone.Transport, this.Sequencer)

		Tone.Transport.bpm.value = this.bpm

		Tone.Transport.start()
		this.Sequencer.start()
	}

	public playWithPreCount(onStart: () => void) {
		console.log("KonnakolGameAudio.playWithPreCount")

		// capture audio context
		Tone.start().then(() => {
			// stop in case it was playing
			if (Tone.Transport.state != "stopped")
				Tone.Transport.stop()

			// set bpm	
			Tone.Transport.bpm.value = this.bpm

			// start tone transport
			Tone.Transport.start()

			// schedule drums
			let time = Tone.now()
			let measureTime = 60 / this.bpm
			
			
			this.drumPlayers.player("Snare").start(time, 0) // Takadimi
			time += measureTime

			
			this.drumPlayers.player("Snare").start(time, 0) // Takadimi
			time += measureTime

			
			this.drumPlayers.player("Snare").start(time, 0) // TaKa
			time += measureTime / 2

			
			this.drumPlayers.player("Snare").start(time, 0) // Taka
			time += measureTime / 2

			
			this.drumPlayers.player("Snare").start(time, 0) // Taka
			time += measureTime / 2

			
			this.drumPlayers.player("Snare").start(time, 0) // Taka
			time += measureTime / 2

			Tone.Draw.schedule(() => {
				onStart()
			}, time)

			// schedule start playing
			Tone.Transport.schedule(() => {
				this.Sequencer.start()
			}, time)
		})
	}

	public pause() {
		console.log("KonnakolGameAudio.pause", this.bpm)

		// pause or stop all
		Tone.Transport.pause()
		this.Sequencer.stop()
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