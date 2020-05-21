import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonList, IonItem, IonLabel, IonButton, IonIcon, useIonViewWillEnter, useIonViewDidEnter } from "@ionic/react"
import { RouteComponentProps } from "react-router"
import { MelodiesStore } from "../lib/Firestore"
import { Melody, MelodyCollection } from "../lib/DataModels"
import { arrowBackOutline } from "ionicons/icons"
import { Analytics } from "../lib/Analytics"

interface CollectionViewPageArgs extends RouteComponentProps<{
  collection_id: string;
}> { }

const CollectionViewPage: React.FC<CollectionViewPageArgs> = (props) => {

  const [currentCollection, setCurrentCollection] = useState<MelodyCollection>()
  const [melodies, setMelodies] = useState<Melody[]>([])

  useIonViewWillEnter(() => {
    MelodiesStore.getCollection(props.match.params.collection_id).then((value) => {
      setCurrentCollection(value)
    })

    MelodiesStore.getMelodies(props.match.params.collection_id).then((value) => {
      setMelodies(value)
    })
  })

  useIonViewDidEnter(() => {
    Analytics.setCurrentScreen("CollectionViewPage", { collection_id: props.match.params.collection_id })
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">

            <IonButton routerDirection={"back"} routerLink="/collections">
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{currentCollection?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList>
          {melodies.map(m => <IonItem key={m.id} routerLink={`/collections/${props.match.params.collection_id}/melody/${m.id}`} routerDirection="forward">
            <IonLabel>
              <h2>{m.order}. {m.name}</h2>
            </IonLabel>
          </IonItem>)}
        </IonList>

      </IonContent>
    </IonPage>
  )
}

export default CollectionViewPage