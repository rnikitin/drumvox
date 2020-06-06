import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonList, IonItem, IonLabel, IonButton, IonIcon, useIonViewWillEnter, useIonViewDidEnter, IonSpinner, IonProgressBar } from "@ionic/react"
import { RouteComponentProps } from "react-router"
import { MelodiesStore } from "../lib/Firestore"
import { Melody, MelodyCollection } from "../lib/DataModels"
import { arrowBackOutline } from "ionicons/icons"
import { Analytics } from "../lib/Analytics"
import EmptyContent from "../components/EmptyContent"

interface CollectionViewPageArgs extends RouteComponentProps<{
  collection_id: string;
}> { }

type CollectionViewPageState = {
  currentCollection: MelodyCollection | null
  melodies: Melody[]
  loading: boolean
}

const CollectionViewPage: React.FC<CollectionViewPageArgs> = (props) => {

  const [state, setState] = useState<CollectionViewPageState>({
    currentCollection: null,
    melodies: [],
    loading: true
  })

  useIonViewWillEnter(() => {

    console.log("CollectionViewPage.useIonViewWillEnter", state)

    Promise.all([
      MelodiesStore.getCollection(props.match.params.collection_id),
      MelodiesStore.getMelodies(props.match.params.collection_id)
    ])
      .then(values => {
        setState({
          currentCollection: (values[0] as MelodyCollection),
          melodies: (values[1] as Melody[]),
          loading: false
        })
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
          <IonTitle>{state.currentCollection?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {state.loading &&
          <IonProgressBar color="dark" type="indeterminate"></IonProgressBar>
        }

        {!state.loading && state.melodies.length > 0 &&
          <IonList>
            {state.melodies.map(m => <IonItem key={m.id} routerLink={`/collections/${props.match.params.collection_id}/melody/${m.id}`} routerDirection="forward">
              <IonLabel>
                <h2>{m.order}. {m.name}</h2>
                <p>{m.description}</p>
              </IonLabel>
            </IonItem>)}
          </IonList>
        }

        {!state.loading && state.melodies.length == 0 &&
          <EmptyContent />
        }

      </IonContent>
    </IonPage>
  )
}

export default CollectionViewPage