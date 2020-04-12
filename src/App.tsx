import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import DrumPage from './pages/DrumPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

    <IonMenu side="start" menuId="first" contentId="mainContent">
      <IonHeader>
        <IonToolbar>
          <IonTitle>World Of Drums</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Drum Machine</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>

    <IonRouterOutlet id="mainContent">
      <Route path="/Drum" component={DrumPage} exact={true} />
      {/* <Route path="/tab2" component={Tab2} exact={true} />
      <Route path="/tab3" component={Tab3} /> */}
      <Route path="/" render={() => <Redirect to="/Drum" />} exact={true} />
    </IonRouterOutlet>

    </IonReactRouter>
  </IonApp>
);

// dark mode
document.body.classList.add('dark');

export default App;
