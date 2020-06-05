import * as Tone from "tone"
import { computed, observable } from "mobx"

// size of playing sequence, constant for now
export const SEQUENCE_SIZE = 16
// Our set of drum notes with mp3
export const DRUM_NOTES = {
    "Ride": "/assets/audio/drumvox/ride.mp3",
    "HH": "/assets/audio/drumvox/hh.mp3",
    "Kick": "/assets/audio/drumvox/kick.mp3",
    "Snare": "/assets/audio/drumvox/snare.mp3",
}

export class DrumMachine {

    melody: string[][] = []
    events: number[] = []
    @observable _bpm = 60
    @computed get bpm() { return this._bpm }
    private currentBeat = 0
    @observable _playing = false
    @computed get playing() { return this._playing }

    beatUICallback: (beat: number) => void

    private sequencer: Tone.Sequence

    // load drums
    drumPlayers: Tone.Players = new Tone.Players(DRUM_NOTES, () => {
        this.drumPlayers.volume.value = -10
        this.drumPlayers.toDestination()

        console.log("drums loaded")
    })

    constructor(beatUICallback: (beat: number) => void) {
        this.beatUICallback = beatUICallback

        console.log("DrumMachine.init")

        this.sequencer = this.createSequencer()   
    }

    /**
     * fires to plan next sequence step
     * @param time 
     * @param beat 
     */
    private seqenceStep(time: number, beat: number) {
        this.currentBeat = beat

        console.log("DrumMachine.sequencer", time, beat)

        // play some notes
        if (this.melody[beat].length > 0) {
            for (let i = 0; i < this.melody[beat].length; i++) {
                let note = this.melody[beat][i]
                this.drumPlayers.player(note).start(time, 0)
            }
        }

        // update UI
        Tone.Draw.schedule(() => {
            this.beatUICallback(beat)
        }, time)
    }

    private createSequencer() {
        // generate sequence and empty melody
        for (let i = 1; i <= SEQUENCE_SIZE; i++) {
            this.melody[i] = []
            this.events.push(i)
        }

        // initialize sequencer
        return new Tone.Sequence((time, beat) => this.seqenceStep(time, beat), this.events, "8n")
    }

    start() {
        Tone.start().then(() => {
            console.log("tone.start")

            Tone.Transport.bpm.value = this.bpm
            Tone.Transport.start()
            this.sequencer.start(0, 0)
			this._playing = true
			
			console.log("DrumMachine.start", this.bpm, this.playing)
        })
    }

    pause() {
        console.log("DrumMachine.pause", this.bpm, this.playing)

        Tone.Transport.pause()
        this._playing = false
    }

    stop() {
        console.log("DrumMachine.stop", this.bpm, this.playing)

        Tone.Transport.stop()
        this.sequencer.stop()
        this._playing = false
	}
	
	resetMelody(){
		this.melody.forEach((v) => {
			v.splice(0, v.length)
		})
	}

    setBPM(bpm: number) {
        console.log("DrumMachine.setBPM", this.bpm, this.playing)

        this._bpm = bpm
        Tone.Transport.bpm.value = this.bpm
    }

    setBeat(beat: number) {
        console.log("DrumMachine.setBeat", this.bpm, this.playing)

        this.currentBeat = beat
    }

    toggleBeat(tick: number, note: string) {


        let idx = this.melody[tick].indexOf(note)
        if (idx > -1) {
            // remove note
            this.melody[tick].splice(idx, 1)
        }
        else {
            // add note
            this.melody[tick].push(note)
        }

        console.log("DrumMachine.toggleBeat", tick, note, this.melody)
    }



}