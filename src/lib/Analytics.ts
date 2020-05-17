import { FirebaseX } from "@ionic-native/firebase-x"
import { AppCenterAnalytics } from "@ionic-native/app-center-analytics"

export class Analytics {

	/**
	 * Automatically track custom event with Firebase and AppCenter
	 * @param name event name
	 * @param data event payload
	 */
	public static LogEvent(name: string, data: any) {

		console.log("try to log", name, data, FirebaseX, AppCenterAnalytics)

		FirebaseX.logEvent(name, data)
			.then(function () {
				console.log("FirebaseX analytics success", arguments)
			},
				function () {
					console.log("FirebaseX analytics fail", arguments)
				})
		AppCenterAnalytics.trackEvent(name, data)
			.then(function () {
				console.log("AppCenterAnalytics analytics success", arguments)
			},
				function () {
					console.log("AppCenterAnalytics analytics fail", arguments)
				})
	}
}