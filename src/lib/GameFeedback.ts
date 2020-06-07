import AuthProvider from "./AuthProvider"
import { PlayingHistory } from "./DataModels"
import { firestore } from "firebase"
import { MelodiesStore } from "./Firestore"



export class GameFeedbackCollector {

	private startTime: Date = new Date()
	private started: boolean = false
	private tempo: number = 0
	private melody_id: string
	private collection_id: string

	constructor(melody_id: string, collection_id: string) {
		this.melody_id = melody_id
		this.collection_id = collection_id
	}

	public startTimer(tempo: number) {
		console.log("GameFeedbackCollector startTimer", tempo, this.started)

		if (this.started) {
			// stop timer, collect data
			this.stopAndSaveHistory()
		}

		// start a new timer
		this.tempo = tempo
		this.startTime = new Date()
		this.started = true
	}

	public async stopAndSaveHistory() {
		this.started = false
		let endTime = new Date()

		const secondsPlayed = (endTime.getTime() - this.startTime.getTime()) / 1000
		const history: PlayingHistory = {
			collection_id: this.collection_id,
			melody_id: this.melody_id,
			played_seconds: secondsPlayed,
			tempo: this.tempo,
			timestamp: endTime
		}

		// ignore playings shorter then 10s
		if (history.played_seconds > 10) {
			await this.saveHistory(history)
			await this.updateLastPlayed(endTime)
		}
	}

	public updateLastPlayed(timestamp: Date) {
		console.log("GameFeedbackCollector updateLastPlayed", this.melody_id, timestamp)
		return MelodiesStore.updateMelodyLastPlayedForUser(AuthProvider.currentUser?.uid!, this.collection_id, this.melody_id, timestamp)
	}

	public countMelody(played_count: number) {
		console.log("GameFeedbackCollector countMelody", played_count)
		return MelodiesStore.incMelodyForUser(AuthProvider.currentUser?.uid!, this.collection_id, this.melody_id, played_count)
	}

	private saveHistory(history: PlayingHistory) {
		console.log("GameFeedbackCollector saveHistory", history)
		return MelodiesStore.savePlayingHistoryForUser(AuthProvider.currentUser?.uid!, history)
	}
}