import { observable } from "mobx"


export enum PlayerState {
	Stopped = "Stopped",
	Playing = "Playing",
	Paused = "Paused"
}

export class PlayerStateStore {
	// TODO: make it getters and add actions
	@observable state = PlayerState.Stopped
	@observable bpm = 60
}

export class ContextStore {
	
	public Player: PlayerStateStore

	constructor() {
		this.Player = new PlayerStateStore()
	}
}

export const AppContext = new ContextStore()