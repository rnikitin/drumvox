import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from "@ionic/react"
import React from "react"
import { firestoreDrum, Collections } from "../lib/Firestore"
import { Melody } from "../lib/DataModels"


const KonnakolAdminPage: React.FC = () => {


	let testMelody: Melody = {
		name: "Just a test melody",
		order: 1,
		instruments: ["Ride", "HH", "Snare", "Kick"],
		beats: [
			{ id: "1", notes: ["Ride"], konnakol: "Ta", main: true },
			{ id: "2", notes: ["HH"], konnakol: "Ka" },
			{ id: "3", notes: ["HH"], konnakol: "Di" },
			{ id: "4", notes: ["HH"], konnakol: "Mi" },
			{ id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "6", notes: ["HH"], konnakol: "Ki" },
			{ id: "7", notes: ["HH"], konnakol: "Ta" },
			{ id: "8", notes: ["HH", "Kick"], konnakol: "Ta", main: true },
			{ id: "9", notes: ["HH"], konnakol: "Ki" },
			{ id: "10", notes: ["HH"], konnakol: "Ta" },
			{ id: "11", notes: ["HH", "Kick"], konnakol: "Ta", main: true },
			{ id: "12", notes: ["HH"], konnakol: "Ka" },
			{ id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "14", notes: ["HH", "Kick"], konnakol: "Ta", main: true },
			{ id: "15", notes: ["HH"], konnakol: "Ki" },
			{ id: "16", notes: ["HH"], konnakol: "Ta" }
		]
	}

	var collectionRef = firestoreDrum.collection(Collections.MelodyCollections).doc("Z7YxGbczLXJuhkg0rSNl")
	var melodiesRef = collectionRef.collection(Collections.Melodies)

	let promise = melodiesRef.add(testMelody)

	promise.then(
		(arg) => {
			console.log("melody added", arg)
		},
		(err) => {
			console.log("melody failed", err)
		}
	)


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

				Ta Ka Di Mi.

		</IonContent>
		</IonPage>
	)
}

export default KonnakolAdminPage