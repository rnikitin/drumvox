import React, { useRef, useState, useEffect } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonFooter, IonButton, IonIcon, useIonViewWillEnter } from "@ionic/react"
import KonnakolPlayer from "../components/KonnakolPlayer"
import KonnakolPlayerToolbar from "../components/KonnakolPlayerToolbar"
import { arrowBackOutline } from "ionicons/icons"
import { RouteComponentProps } from "react-router"
import { Melody } from "../lib/DataModels"
import { KonnakolMelody } from "../lib/KonnakolMelody"
import { firestoreDrum, MelodiesStore } from "../lib/Firestore"
import { Analytics } from "../lib/Analytics"

interface KanakolPlayerPagePageArgs extends RouteComponentProps<{
  melody_id: string
  collection_id: string
}> { }

const KanakolPlayerPage: React.FC<KanakolPlayerPagePageArgs> = (props) => {
  const contentRef = useRef<HTMLIonContentElement>(null)

  const [melody, setMelody] = useState<KonnakolMelody>()

  useIonViewWillEnter(() => {
    MelodiesStore.getMelody(props.match.params.collection_id, props.match.params.melody_id)
      .then((val) => {
        setMelody(val)
      })

    Analytics.setCurrentScreen("KanakolPlayerPage", { collection_id: props.match.params.collection_id, melody_id: props.match.params.melody_id })
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerDirection={"back"} routerLink={`/collections/${props.match.params.collection_id}`} >
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{melody?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} class="kannakol-player-content" slot="fixed" forceOverscroll={false}>
        {melody ? (<KonnakolPlayer contentRef={contentRef} melody={melody!} />) : ("")}
      </IonContent>

      <IonFooter>
        <KonnakolPlayerToolbar />
      </IonFooter>

    </IonPage>
  )
}

export default KanakolPlayerPage