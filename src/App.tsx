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
  IonItem
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import DrumMachinePage from './pages/DrumMachinePage';
import KonnakolPlayerPage from './pages/KonnakolPlayerPage';
import { AppProvider } from './AppContext';
import LogRocket from 'logrocket';

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
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

//LogRocket.init('zfojck/drumvox');

const App: React.FC = () => (
  <AppProvider>
    <IonApp>
      <IonReactRouter>
        <IonMenu side="start" menuId="first" contentId="mainContent">
          <IonHeader>
            <IonToolbar>
              <IonTitle>DrumVox</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem href="/kanakolPlayer">Kanakol Player</IonItem>
              <IonItem href="/drumMachine">Drum Machine</IonItem>

            </IonList>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="mainContent">
          <Route path="/drumMachine" component={DrumMachinePage} exact={true} />
          <Route path="/kanakolPlayer" component={KonnakolPlayerPage} exact={true} />
          <Route path="/" render={() => <Redirect to="/kanakolPlayer" />} exact={true} />
        </IonRouterOutlet>

      </IonReactRouter>
    </IonApp>
  </AppProvider>
);

export default App;
