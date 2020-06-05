import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonItem, IonLabel, IonList, useIonViewWillEnter, useIonViewDidEnter, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonProgressBar } from "@ionic/react"
import { MelodiesStore } from "../lib/Firestore"
import { MelodyCollection } from "../lib/DataModels"
import { Analytics } from "../lib/Analytics"

type CollectionsListPageState = {
	collections: MelodyCollection[]
	loading: boolean
}

const CollectionsListPage: React.FC = () => {

	const [state, setState] = useState<CollectionsListPageState>({
		collections: [],
		loading: true
	})

	useIonViewWillEnter(() => {
		MelodiesStore.getCollections().then((value) => {
			setState({
				collections: value,
				loading: false
			})
		})
	})

	useIonViewDidEnter(() => {
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
				{state.loading &&
					<IonProgressBar color="dark" type="indeterminate"></IonProgressBar>
				}

				{!state.loading && state.collections.length > 0 &&
					<IonList>
						{state.collections.map(col =>
							<IonItem key={col.id} routerLink={"/collections/" + col.id} routerDirection="forward">
								<IonLabel>
									<h2>{col.order}. {col.name}</h2>
									<p>{col.description}</p>
								</IonLabel>
							</IonItem>
						)}
					</IonList>
				}

				{!state.loading && !state.collections.length &&
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>OMG!</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							There is no content right now. Please check this section later!
						</IonCardContent>
					</IonCard>
				}
			</IonContent>
		</IonPage>
	)
}

export default CollectionsListPage