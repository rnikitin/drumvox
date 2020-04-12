import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import './DrumPage.css';
import DrumMachine from '../components/DrumMachine';

const DrumPage: React.FC = () => {
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
    );
};


export default DrumPage;