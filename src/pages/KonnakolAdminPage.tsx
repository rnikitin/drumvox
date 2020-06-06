import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton } from "@ionic/react"
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

	let konnakolBasics: Melody[] = [
		{
			id: "konnakol_basics_lesson_1",
			name: "Упражнение 1",
			description: "Та — удар на каждый слог",
			order: 1,
			instruments: ["Snare"],
			beats: [
				{ id: "1", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "", notes: [], konnakol: "" },
			]
		},
		{
			id: "konnakol_basics_lesson_2",
			name: "Упражнение 2",
			description: "Та Ка — удар на первый слог каждой цифры",
			order: 2,
			instruments: ["Snare"],
			beats: [
				{ id: "1", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: [], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: [], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "5", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "6", notes: [], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "7", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "8", notes: [], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
			]
		},
		{
			id: "konnakol_basics_lesson_3",
			name: "Упражнение 3",
			description: "Та Ки Та — удар на первый слог каждой цифры",
			order: 3,
			instruments: ["Snare"],
			beats: [
				{ id: "1", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "2", notes: [], konnakol: "ki" },
				{ id: "3", notes: [], konnakol: "ta" },
				{ id: "4", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "5", notes: [], konnakol: "ki" },
				{ id: "6", notes: [], konnakol: "ta" },
				{ id: "7", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "8", notes: [], konnakol: "ki" },
				{ id: "9", notes: [], konnakol: "ta" },
				{ id: "10", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "11", notes: [], konnakol: "ki" },
				{ id: "12", notes: [], konnakol: "ta" }
			]
		},
		{
			id: "konnakol_basics_lesson_4",
			name: "Упражнение 4",
			description: "Та Ка Ды Ми — удар на первый слог каждой цифры",
			order: 4,
			instruments: ["Snare"],
			beats: [
				{ id: "1", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "2", notes: [], konnakol: "ka" },
				{ id: "3", notes: [], konnakol: "di" },
				{ id: "4", notes: [], konnakol: "mi" },
				{ id: "5", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "6", notes: [], konnakol: "ka" },
				{ id: "7", notes: [], konnakol: "di" },
				{ id: "8", notes: [], konnakol: "mi" },
				{ id: "9", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "10", notes: [], konnakol: "ka" },
				{ id: "11", notes: [], konnakol: "di" },
				{ id: "12", notes: [], konnakol: "mi" },
				{ id: "13", notes: ["Snare"], konnakol: "Ta", main: true },
				{ id: "14", notes: [], konnakol: "ka" },
				{ id: "15", notes: [], konnakol: "di" },
				{ id: "16", notes: [], konnakol: "mi" }
			]
		},
		{
			id: "konnakol_basics_lesson_5",
			name: "Упражнение 5",
			description: "Да Ды Ги На Дум — удар на первый слог каждой цифры",
			order: 5,
			instruments: ["Snare"],
			beats: [
				{ id: "1", notes: ["Snare"], konnakol: "Da", main: true },
				{ id: "2", notes: [], konnakol: "di" },
				{ id: "3", notes: [], konnakol: "gi" },
				{ id: "4", notes: [], konnakol: "na" },
				{ id: "5", notes: [], konnakol: "dum" },
				{ id: "6", notes: ["Snare"], konnakol: "Da", main: true },
				{ id: "7", notes: [], konnakol: "di" },
				{ id: "8", notes: [], konnakol: "gi" },
				{ id: "9", notes: [], konnakol: "na" },
				{ id: "10", notes: [], konnakol: "dum" },
				{ id: "11", notes: ["Snare"], konnakol: "Da", main: true },
				{ id: "12", notes: [], konnakol: "di" },
				{ id: "13", notes: [], konnakol: "gi" },
				{ id: "14", notes: [], konnakol: "na" },
				{ id: "15", notes: [], konnakol: "dum" },
				{ id: "16", notes: ["Snare"], konnakol: "Da", main: true },
				{ id: "17", notes: [], konnakol: "di" },
				{ id: "18", notes: [], konnakol: "gi" },
				{ id: "19", notes: [], konnakol: "na" },
				{ id: "20", notes: [], konnakol: "dum" }
			]
		}
	]

	function updateKonnakolBasics() {
		var collectionRef = firestoreDrum.collection(Collections.MelodyCollections).doc("konnakol_basics")
		var melodiesRef = collectionRef.collection(Collections.Melodies)

		console.log("inserting", konnakolBasics)

		konnakolBasics.forEach((data) => {
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

				<IonButton onClick={updateKonnakolBasics}>
					Update Konnakol Basics
				</IonButton>

			</IonContent>
		</IonPage>
	)
}

export default KonnakolAdminPage