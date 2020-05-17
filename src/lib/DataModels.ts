export type MelodyCollection = {
	readonly id: string,
	readonly order: number,
	readonly name: string,
	readonly description: string
}

export type Melody = {
	readonly id: string,
	readonly order: number,
	readonly name: string
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

		return { id: snapshot.id, order: data.order, name: data.name }
	}
}
