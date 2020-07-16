import { firebaseWebApp } from './Firebase'
import { MelodyCollectionConverter, MelodyConverter, PlayingHistory, MelodyStatsConverter } from './DataModels'

function init() {
	const firestore = firebaseWebApp.firestore()

	// enable persistance storage by default
	firestore.enablePersistence({ synchronizeTabs: true })

	return firestore
}

export enum Collections {
	collections = 'collections',
	melodies = 'melodies',
	users = 'users',
	melody_stats = 'melody_stats',
	tempo_stats = 'tempo_stats',
	playing_history = 'playing_history'
}

export class MelodiesStore {
	/**
	 * Get all available melodies collections
	 */
	public static async getCollections() {
		const snapshop = (await firestoreDrum.collection(Collections.collections)
			.withConverter(MelodyCollectionConverter)
			.orderBy('order')
			.get()).docs
		return snapshop.map(c => c.data())
	}

	/**
	 * get collection document
	 * @param id collection's id
	 */
	public static async getCollection(id: string) {
		const snapshop = await firestoreDrum.collection(Collections.collections)
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
		const snapshop = (await firestoreDrum.collection(Collections.collections)
			.doc(id)
			.collection(Collections.melodies)
			.orderBy('order')
			.withConverter(MelodyConverter)
			.get()).docs

		return snapshop.map(m => m.data())
	}

	public static async getMelody(collection_id: string, id: string) {
		const snapshop = await firestoreDrum.collection(Collections.collections)
			.doc(collection_id)
			.collection(Collections.melodies)
			.doc(id)
			.withConverter(MelodyConverter)
			.get()

		return snapshop.data()
	}

	/**
	 * Updates melody's last played time for the User 
	 * @param user_id 
	 * @param melody_id 
	 * @param timestamp 
	 */
	public static async updateMelodyLastPlayedForUser(user_id: string, collection_id: string, melody_id: string, timestamp: Date) {
		console.log('Firestore updateLastPlayed', user_id, melody_id, timestamp)

		const snapshop = await firestoreDrum.collection(Collections.users)
			.doc(user_id)
			.collection(Collections.melody_stats)
			.doc(MelodyStatsConverter.compoundId(collection_id, melody_id))

		const melody_stats = (await snapshop
			.withConverter(MelodyStatsConverter)
			.get())
			.data()

		if (melody_stats) {
			// update
			melody_stats.last_played = timestamp
			return snapshop.set(melody_stats)
		}
		else {
			// create new
			return snapshop.set(MelodyStatsConverter.toFirestore({
				collection_id: collection_id,
				melody_id: melody_id,
				last_played: timestamp,
				played_count: 0,
				progress: 0
			}))
		}
	}

	/**
	 * Increment melody play counter for the User
	 * @param user_id 
	 * @param played_count 
	 */
	public static async incMelodyForUser(user_id: string, collection_id: string, melody_id: string, played_count: number) {
		console.log('Firestore countMelody', collection_id, melody_id, played_count)

		const snapshop = await firestoreDrum.collection(Collections.users)
			.doc(user_id)
			.collection(Collections.melody_stats)
			.doc(MelodyStatsConverter.compoundId(collection_id, melody_id))

		const melody_stats = (await snapshop
			.withConverter(MelodyStatsConverter)
			.get())
			.data()


		if (melody_stats) {
			// update
			melody_stats.played_count += played_count
			return snapshop.set(melody_stats)
		}
		else {
			// create new
			return snapshop.set(MelodyStatsConverter.toFirestore({
				collection_id: collection_id,
				melody_id: melody_id,
				last_played: new Date(),
				played_count: played_count,
				progress: 0
			}))
		}
	}

	/**
	 * Saves playing history for the User
	 * @param user_id 
	 * @param history 
	 */
	public static async savePlayingHistoryForUser(user_id: string, history: PlayingHistory) {
		console.log('Firestore saveHistory', history)

		const snapshot = firestoreDrum.collection(Collections.users)
			.doc(user_id)
			.collection(Collections.melody_stats)
			.doc(MelodyStatsConverter.compoundId(history.collection_id, history.melody_id))
			.collection(Collections.playing_history)

		return snapshot.add(history)
	}
}

export const firestoreDrum = init()