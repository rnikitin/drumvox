import { observable, computed } from "mobx"


export class PlayerStateStore {
	@observable playing = false
	@observable bpm = 60
	@observable stopping = 0
}

export class ContextStore {
	
	public Player: PlayerStateStore

	constructor() {
		this.Player = new PlayerStateStore()
	}
}

export const AppContext = new ContextStore()