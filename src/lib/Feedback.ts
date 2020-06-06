

export type TempoStats = {
	tempo: number
	progress: number
	played_seconds: number
}

export type PlayingHistory = {
	timestamp: Date
	tempo: number
	played_seconds: number
}

export type MelodyStats = {
	melody_id: string
	collection_id: string
	last_played: Date
	played_count: number
	progress: number

	tempo_stats: TempoStats[]
	playing_history: PlayingHistory[]
}

export class FeedbackCollector{

	private startTime: Date = new Date()
	private started: boolean = false
	private tempo: number = 0
	private melody_id: string
	private collection_id: string

	constructor(melody_id: string, collection_id: string){
		this.melody_id = melody_id
		this.collection_id = collection_id
	}

	public startTimer(tempo: number){
		if (this.started){
			// todo stop timer, collect data
			this.stopAndSaveHistory()
		}

		// start a new timer
		this.startTime = new Date()
		this.started = true
	}

	public stopAndSaveHistory(){
		let endTime = new Date()
		this.started = false

		const secondsPlayed = (endTime.getTime() - this.startTime.getTime())/1000
		const history: PlayingHistory = {
			played_seconds: secondsPlayed,
			tempo: this.tempo,
			timestamp: endTime
		}

		// todo async save history
		setTimeout(() => {
			this.saveHistory(history)
		}, 10)

		// todo async save last_played for the melody
		setTimeout(() => {
			this.updateLastPlayed(endTime)
		}, 10)
	}

	public updateLastPlayed(timestamp: Date){

	}

	public countMelody(played_count: number){
		// todo get melody stats

		// todo increase played count by new played_count 
	}

	private saveHistory(history: PlayingHistory){

	}
}