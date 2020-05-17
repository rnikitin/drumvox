import { FirebaseX } from "@ionic-native/firebase-x"
import { AppCenterAnalytics } from "@ionic-native/app-center-analytics"
import { analytics } from "ionicons/icons"



export class Analytics {

	/**
	 * Automatically track custom event with Firebase and AppCenter
	 * @param name event name
	 * @param data event payload
	 */
	public static LogEvent(name: string, data: any) {
		FirebaseX.logEvent(name, data)
		AppCenterAnalytics.trackEvent(name, data)
	}
}