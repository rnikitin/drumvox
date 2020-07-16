import { initializeApp, app } from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics'
import { getPlatforms } from '@ionic/react'

const platforms = getPlatforms()

const firebaseConfig = {
  apiKey: 'AIzaSyCBkrRh_OabSeLb-kyhpNytTbwIRP6hxkA',
  authDomain: 'drumvox-prod.firebaseapp.com',
  databaseURL: 'https://drumvox-prod.firebaseio.com',
  projectId: 'drumvox-prod',
  storageBucket: 'drumvox-prod.appspot.com',
  messagingSenderId: '380858414699',
  appId: '1:380858414699:web:3baaa9ca96d0889836e32e',
  measurementId: 'G-ZTPC62FZVV'
}

// initialize firebase
export const firebaseWebApp = initializeApp(firebaseConfig)

// enable web or native firebase analytics only on web
if (platforms.includes('desktop') || platforms.includes('mobileweb')) {
  firebaseWebApp.analytics().setAnalyticsCollectionEnabled(true)
  FirebaseAnalytics.setEnabled(false)
}
else {
  firebaseWebApp.analytics().setAnalyticsCollectionEnabled(false)
  FirebaseAnalytics.setEnabled(true)
}

class UniversalFirebase {
  private app: firebase.app.App
  constructor(firebaseApp: firebase.app.App) {
    this.app = firebaseApp
  }

  public setCurrentScreen(name: string) {
    if (platforms.includes('desktop') || platforms.includes('mobileweb')) {
      // web
      this.app.analytics().setCurrentScreen(name)
    }
    else {
      // native mobile
      FirebaseAnalytics.setCurrentScreen(name)
    }
  }

  public logEvent(name: string, data: any) {
    if (platforms.includes('desktop') || platforms.includes('mobileweb')) {
      // web
      this.app.analytics().logEvent(name, data)
    }
    else {
      // native mobile
      FirebaseAnalytics.logEvent(name, data)
    }
  }
}

export const UniversalFirebaseAnalytics = new UniversalFirebase(firebaseWebApp)