
import { AppCenterAnalytics } from "@ionic-native/app-center-analytics"
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics"
//import { app } from "./Firebase"

//const fa = app.analytics()

FirebaseAnalytics.setEnabled(true)

export class Analytics {

	/**
	 * Automatically track custom event with Firebase and AppCenter
	 * @param name event name
	 * @param data event payload
	 */
	public static LogEvent(name: string, data: any) {

		setTimeout(() => {
			FirebaseAnalytics.logEvent(name, data)
			AppCenterAnalytics.trackEvent(name, data)
		})
	}


	public static setCurrentScreen(name: string, data: any) {

		setTimeout(() => {
			FirebaseAnalytics.setCurrentScreen(name)
			AppCenterAnalytics.trackEvent("PageView", { ...data, screenName: name })
		})
	}
}