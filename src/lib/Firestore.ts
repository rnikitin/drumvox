import { app } from "./Firebase"
import { MelodyCollectionConverter, MelodyConverter } from "./DataModels"

export function debug() {
	firestoreDrum.collection("melody_collections").get().then((data) => {
		console.log("melody_collections", data.docs)
	})

	return "testing connection to firestore"
}

function init() {
	const firestore = app.firestore()

	// enable persistance storage by default
	firestore.enablePersistence()

	return firestore
}

export enum Collections {
	MelodyCollections = "melody_collections",
	Melodies = "melodies"
}

export class MelodiesStore {
	/**
	 * Get all available melodies collections
	 */
	public static async getCollections() {
		let snapshop = (await firestoreDrum.collection(Collections.MelodyCollections)
			.withConverter(MelodyCollectionConverter)
			.orderBy("order")
			.get()).docs
		return snapshop.map(c => c.data())
	}

	/**
	 * get collection document
	 * @param id collection's id
	 */
	public static async getCollection(id: string) {
		let snapshop = await firestoreDrum.collection(Collections.MelodyCollections)
			.doc(id)
			.withConverter(MelodyCollectionConverter)
			.get()
		return snapshop.data()
	}

	/**
	 * Get all melodies from collection
	 * @param id collection's id
	 */
	public static async getMelodies(id: string) {
		let snapshop = (await firestoreDrum.collection(Collections.MelodyCollections)
			.doc(id)
			.collection(Collections.Melodies)
			.withConverter(MelodyConverter)
			.orderBy("order")
			.get()).docs

		return snapshop.map(m => m.data())
	}

	public static async getMelody(collection_id:string, id: string) {
		let snapshop = (await firestoreDrum.collection(Collections.MelodyCollections)
		.doc(collection_id)
		.collection(Collections.Melodies)
		.doc(id)
		.withConverter(MelodyConverter)
		.get())

		return snapshop.data()
	}
}

export const firestoreDrum = init()