import { MelodyBeat } from "./KonnakolMelody"

export type MelodyCollection = {
	readonly id: string
	readonly order: number
	readonly name: string
	readonly description: string
}

export type Melody = {
	readonly id?: string
	readonly collection_id?: string
	readonly description?: string
	readonly order: number
	readonly name: string
	instruments: string[]
	beats: MelodyBeat[]
}

export const MelodyCollectionConverter = {
	toFirestore(melodyCollection: MelodyCollection): firebase.firestore.DocumentData {
		return melodyCollection
	},
	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): MelodyCollection {
		const data = snapshot.data(options)!

		return { id: snapshot.id, order: data.order, name: data.name, description: data.description }
	}
}

export const MelodyConverter = {
	toFirestore(melody: Melody): firebase.firestore.DocumentData {
		return melody
	},
	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): Melody {
		const data = snapshot.data(options)!

		return {
			id: snapshot.id,
			order: data.order,
			name: data.name,
			description: data.description,
			collection_id: snapshot.ref.parent.id,
			instruments: data.instruments,
			beats: data.beats
		}
	}
}
