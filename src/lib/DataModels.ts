
export type MelodyCollection = {
	id: string
	readonly order: number
	readonly name: string
	readonly description: string
}

export type KonnakolMelody = {
	id?: string
	readonly collection_id?: string
	readonly description?: string
	readonly order: number
	readonly name: string
	instruments: string[]
	beats: MelodyBeat[]
}

export type MelodyBeat = {
	id: string
	notes: string[]
	konnakol: string
	num?: number
	main?: boolean
};

export const MelodyCollectionConverter = {
	toFirestore(melodyCollection: MelodyCollection): firebase.firestore.DocumentData {
		return melodyCollection
	},
	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): MelodyCollection {
		const data = snapshot.data(options)!

		return { 
			id: snapshot.id, 
			order: data.order, 
			name: data.name, 
			description: 
			data.description 
		}
	}
}

export const MelodyConverter = {
	toFirestore(melody: KonnakolMelody): firebase.firestore.DocumentData {
		return melody
	},
	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): KonnakolMelody {
		const data = snapshot.data(options)!

		return {
			id: snapshot.id,
			order: data.order,
			name: data.name,
			description: data.description,
			collection_id: snapshot.ref.parent.parent?.id,
			instruments: data.instruments,
			beats: data.beats
		}
	}
}

export type TempoStats = {
	tempo: number
	progress: number
	played_seconds: number
}

export type PlayingHistory = {
	melody_id: string
	collection_id: string
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
}

export const MelodyStatsConverter = {
	toFirestore(melody_stats: MelodyStats): firebase.firestore.DocumentData {
		return melody_stats
	},
	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): MelodyStats {
		const data = snapshot.data(options)!

		return {
			collection_id: data.collection_id,
			melody_id: data.melody_id,
			last_played: data.last_played,
			played_count: data.played_count,
			progress: data.progress
		}
	},

	compoundId(collection_id: string, melody_id: string): string {
		return collection_id + "+" + melody_id
	}
}