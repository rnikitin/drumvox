import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton } from "@ionic/react"
import React from "react"
import { firestoreDrum, Collections } from "../lib/Firestore"
import { KonnakolMelody } from "../lib/DataModels"


const KonnakolAdminPage: React.FC = () => {

	let testMelody: KonnakolMelody = {
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

	let konnakolBasics: KonnakolMelody[] = [
		{
			id: "konnakol_basics_lesson_1",
			name: "Exercise 1",
			description: "Ta Ta Ta Ta — hit on every Ta",
			order: 1,
			instruments: ["HH", "Snare"],
			beats: [
				{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
			]
		},
		{
			id: "konnakol_basics_lesson_2",
			name: "Exercise 2",
			description: "Ta ka Ta ka Ta ka Ta ka — hit on every Ta",
			order: 2,
			instruments: ["HH", "Snare"],
			beats: [
				{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "6", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "8", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
			]
		},
		{
			id: "konnakol_basics_lesson_3",
			name: "Упражнение 3",
			description: "Та Ки Та — удар на первый слог каждой цифры",
			order: 3,
			instruments: ["HH", "Snare"],
			beats: [
				{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: ["HH"], konnakol: "ki" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["HH"], konnakol: "ta" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "5", notes: ["HH"], konnakol: "ki" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "6", notes: ["HH"], konnakol: "ta" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "8", notes: ["HH"], konnakol: "ki" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "9", notes: ["HH"], konnakol: "ta" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "10", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "11", notes: ["HH"], konnakol: "ki" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "12", notes: ["HH"], konnakol: "ta" },
				{ id: "", notes: [], konnakol: "" },
			]
		},
		{
			id: "konnakol_basics_lesson_4",
			name: "Упражнение 4",
			description: "Та Ка Ды Ми — удар на первый слог каждой цифры",
			order: 4,
			instruments: ["HH", "Snare"],
			beats: [
				{ id: "1", notes: ["HH","Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: ["HH"], konnakol: "mi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "6", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "7", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "8", notes: ["HH"], konnakol: "mi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "9", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "10", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "11", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "12", notes: ["HH"], konnakol: "mi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "14", notes: ["HH"], konnakol: "ka" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "15", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "16", notes: ["HH"], konnakol: "mi" },
				{ id: "", notes: [], konnakol: "" },
			]
		},
		{
			id: "konnakol_basics_lesson_5",
			name: "Упражнение 5",
			description: "Да Ды Ги На Дум — удар на первый слог каждой цифры",
			order: 5,
			instruments: ["HH", "Snare"],
			beats: [
				{ id: "1", notes: ["HH", "Snare"], konnakol: "Da", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "2", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "3", notes: ["HH"], konnakol: "gi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "4", notes: ["HH"], konnakol: "na" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "5", notes: ["HH"], konnakol: "dum" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "6", notes: ["HH", "Snare"], konnakol: "Da", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "7", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "8", notes: ["HH"], konnakol: "gi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "9", notes: ["HH"], konnakol: "na" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "10", notes: ["HH"], konnakol: "dum" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "11", notes: ["HH", "Snare"], konnakol: "Da", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "12", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "13", notes: ["HH"], konnakol: "gi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "14", notes: ["HH"], konnakol: "na" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "15", notes: ["HH"], konnakol: "dum" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "16", notes: ["HH", "Snare"], konnakol: "Da", main: true },
				{ id: "", notes: [], konnakol: "" },
				{ id: "17", notes: ["HH"], konnakol: "di" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "18", notes: ["HH"], konnakol: "gi" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "19", notes: ["HH"], konnakol: "na" },
				{ id: "", notes: [], konnakol: "" },
				{ id: "20", notes: ["HH"], konnakol: "dum" },
				{ id: "", notes: [], konnakol: "" },
			]
		}
	]

	function updateKonnakolBasics() {
		var collectionRef = firestoreDrum.collection(Collections.melody_collections).doc("konnakol_basics")
		var melodiesRef = collectionRef.collection(Collections.melodies)

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