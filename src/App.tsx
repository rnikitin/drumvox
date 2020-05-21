import React from "react"
import { Redirect, Route } from "react-router-dom"
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
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import DrumMachinePage from "./pages/DrumMachinePage"
import KonnakolPlayerPage from "./pages/KonnakolPlayerPage"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"


/* Theme variables */
import "./theme/variables.css"
import { ScreenOrientation } from "@ionic-native/screen-orientation"
import * as firebase from "./lib/Firebase"
import CollectionsListPage from "./pages/CollectionsListPage"
import CollectionView from "./pages/CollectionViewPage"
import KonnakolAdminPage from "./pages/KonnakolAdminPage"

//LogRocket.init('zfojck/drumvox');


ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE)
  .then(v => {
    console.log("Screen orientation locked.", v)
  },
    err => {
      console.log("failed to lock orientation...", err)
    })

// start analytics tracking
//firebase.app.analytics()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu side="end" menuId="first" contentId="mainContent">
        <IonHeader>
          <IonToolbar>
            <IonTitle>DrumVox</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem href="/collections">Collections</IonItem>
            <IonItem href="/drumMachine">Drum Machine</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="mainContent">
        <Route path="/drumMachine" component={DrumMachinePage} exact={true} />
        <Route path="/konnakolAdmin" component={KonnakolAdminPage} exact={true} />
        <Route path="/collections/:collection_id/melody/:melody_id" component={KonnakolPlayerPage} />
        <Route path="/collections/:collection_id" component={CollectionView} />
        <Route path="/collections" component={CollectionsListPage} exact={true} />

        <Redirect exact from="/" to="/collections" />
      </IonRouterOutlet>

    </IonReactRouter>
  </IonApp>
)

export default App
