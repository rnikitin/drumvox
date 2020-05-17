import { app } from "./Firebase"
import { MelodyCollectionConverter, MelodyConverter } from "./DataModels"

export function debug() {
	firestore.collection("melody_collections").get().then((data) => {
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

enum Collections {
	MelodyCollections = "melody_collections",
	Melodies = "melodies"
}

export class MelodiesStore {
	/**
	 * Get all available melodies collections
	 */
	public static async getCollections() {
		let melody_collections = (await firestore.collection(Collections.MelodyCollections)
			.withConverter(MelodyCollectionConverter)
			.orderBy("order")
			.get()).docs
		return melody_collections.map(c => c.data())
	}

	/**
	 * get collection document
	 * @param id collection's id
	 */
	public static async getCollection(id: string) {
		let collection = await firestore.collection(Collections.MelodyCollections)
			.doc(id)
			.withConverter(MelodyCollectionConverter)
			.get()
		return collection.data()
	}

	/**
	 * Get all melodies from collection
	 * @param id collection's id
	 */
	public static async getMelodies(id: string) {
		let melodies = (await firestore.collection(Collections.MelodyCollections)
			.doc(id)
			.collection(Collections.Melodies)
			.withConverter(MelodyConverter)
			.orderBy("order")
			.get()).docs

		return melodies.map(m => m.data())
	}
}

export const firestore = init()