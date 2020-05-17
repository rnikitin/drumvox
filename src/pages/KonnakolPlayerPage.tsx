import React, { useRef } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonFooter } from "@ionic/react"
import KonnakolPlayer from "../components/KonnakolPlayer"
import KonnakolPlayerToolbar from "../components/KonnakolPlayerToolbar"

const KanakolPlayerPage: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement>(null)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>KonnakolPlayer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} class="kannakol-player-content" slot="fixed" forceOverscroll={false}>
        <KonnakolPlayer contentRef={contentRef} />
      </IonContent>

      <IonFooter>
        <KonnakolPlayerToolbar />
      </IonFooter>

    </IonPage>
  )
}

export default KanakolPlayerPage