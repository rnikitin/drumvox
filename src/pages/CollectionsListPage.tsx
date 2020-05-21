import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonItem, IonLabel, IonList, useIonViewWillEnter } from "@ionic/react"
import { MelodiesStore } from "../lib/Firestore"
import { MelodyCollection } from "../lib/DataModels"
import { Analytics } from "../lib/Analytics"

const CollectionsListPage: React.FC = () => {

	const [collections, setCollections] = useState<MelodyCollection[]>([])

	useIonViewWillEnter(() => {
		MelodiesStore.getCollections().then((value) => {
			setCollections(value)
		})

		Analytics.setCurrentScreen("CollectionsListPage", {})
	})

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="end">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Explore our best collections</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					{collections.map(col => <IonItem key={col.id} routerLink={"/collections/" + col.id} routerDirection="forward">
						<IonLabel>
							<h2>{col.order}. {col.name}</h2>
							<p>{col.description}</p>
						</IonLabel>
					</IonItem>)}
				</IonList>
			</IonContent>
		</IonPage>
	)
}

export default CollectionsListPage