import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonItem, IonLabel, IonList } from "@ionic/react"
import { MelodiesStore } from "../lib/Firestore"
import { MelodyCollection } from "../lib/DataModels"

const CollectionsListPage: React.FC = () => {

	const [collections, setCollections] = useState<MelodyCollection[]>([])

	MelodiesStore.getCollections().then((value) => {
		setCollections(value)
	})

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Explore our best collections</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					{collections.map(col => <IonItem key={col.id} routerLink={"/collection/" + col.id}>
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