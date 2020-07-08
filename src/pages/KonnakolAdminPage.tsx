import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton } from '@ionic/react'
import React from 'react'
import { firestoreDrum, Collections } from '../lib/Firestore'
import { KonnakolMelody, MelodyCollection } from '../lib/DataModels'
import { KonnakolBasics, KonnakolBasicsCollection } from '../lib/collections/KonnakolBasics'
import { RhythmicExercisesP1Collection, RhythmicExercisesP1Melodies } from '../lib/collections/RhythmicExersises_p1'
import { BassAndSnareDrumReadinP1Melodies, BassAndSnareDrumReadinP1Collection } from '../lib/collections/BassAndSnareDrumReading_p1'


const KonnakolAdminPage: React.FC = () => {

	function updateCollection(collection: MelodyCollection, melodies: KonnakolMelody[]) {
		const collectionRef = firestoreDrum
			.collection(Collections.collections)
			.doc(collection.id)
		const melodiesRef = collectionRef.collection(Collections.melodies)

		console.log('updating', collection, melodies)

		// update
		collectionRef.set(collection)

		melodies.forEach((data) => {
			melodiesRef.doc(data.id).set(data)
		})
	}


	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="end">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Konnakol Admin</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>

				<IonButton onClick={() => updateCollection(KonnakolBasicsCollection, KonnakolBasics)}>
					Update Konnakol Basics
				</IonButton>
				<IonButton onClick={() => updateCollection(RhythmicExercisesP1Collection, RhythmicExercisesP1Melodies)}>
					Update Rhytmic Exercises part 1
				</IonButton>
				<IonButton onClick={() => updateCollection(BassAndSnareDrumReadinP1Collection, BassAndSnareDrumReadinP1Melodies)}>
					Update Bass and Snare Drum Reading part 1
				</IonButton>

			</IonContent>
		</IonPage>
	)
}

export default KonnakolAdminPage