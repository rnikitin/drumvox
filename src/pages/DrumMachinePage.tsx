import React from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonViewDidEnter } from "@ionic/react"
import "./DrumMachinePage.css"
import DrumMachine from "../components/DrumMachine"
import { Analytics } from "../lib/Analytics"

const DrumMachinePage: React.FC = () => {

  useIonViewDidEnter(() => {
    Analytics.setCurrentScreen("DrumMachinePage", {})
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Stupid Simple Drum Machine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>

        <DrumMachine />

      </IonContent>
    </IonPage>
  )
}

export default DrumMachinePage