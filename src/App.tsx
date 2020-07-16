import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { DrumMachinePage } from './pages/DrumMachinePage'
import KonnakolPlayerPage from './pages/KonnakolPlayerPage'

import CollectionsListPage from './pages/CollectionsListPage'
import CollectionView from './pages/CollectionViewPage'
import KonnakolAdminPage from './pages/KonnakolAdminPage'
import AboutPage from './pages/AboutPage'
import RightMenu from './components/RightMenu'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'


/* Theme variables */
import './theme/variables.css'
import {Intercom, PushNotifications} from './lib/Intercom'

//LogRocket.init('zfojck/drumvox');

const App: React.FC = () => {

  useEffect(() => {
    setTimeout(() => {
      Intercom.displayLauncher()
    }, 1000)

    PushNotifications.requestPermission().then(() => {
      PushNotifications.register()
    })
  }, [])

  return (
    <IonApp>
      <IonReactRouter>

        <RightMenu />

        <IonRouterOutlet id="mainContent">
          <Route path="/drumMachine" component={DrumMachinePage} exact={true} />
          <Route path="/admin" component={KonnakolAdminPage} exact={true} />
          <Route path="/about" component={AboutPage} exact={true} />
          <Route path="/collections/:collection_id/melody/:melody_id" component={KonnakolPlayerPage} exact={true} />
          <Route path="/collections/:collection_id" component={CollectionView} exact={true} />
          <Route path="/collections" component={CollectionsListPage} exact={true} />

          <Redirect exact from="/" to="/collections" />
        </IonRouterOutlet>

      </IonReactRouter>
    </IonApp>
  )
}

export default App
