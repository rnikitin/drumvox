import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonList, IonItem, IonLabel } from "@ionic/react"
import { RouteComponentProps } from "react-router"
import { MelodiesStore } from "../lib/Firestore"
import { Melody } from "../lib/DataModels"

interface CollectionViewPageProps extends RouteComponentProps<{
  id: string;
}> { }

const CollectionViewPage: React.FC<CollectionViewPageProps> = (props) => {

  const [melodies, setMelodies] = useState<Melody[]>([])

  MelodiesStore.getMelodies(props.match.params.id).then((value) => {
    setMelodies(value)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Explore our best melodies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList>
          {melodies.map(m => <IonItem key={m.id} routerLink={"/player/" + m.id}>
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