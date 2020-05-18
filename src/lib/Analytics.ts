
import { AppCenterAnalytics } from "@ionic-native/app-center-analytics"

export class Analytics {

	/**
	 * Automatically track custom event with Firebase and AppCenter
	 * @param name event name
	 * @param data event payload
	 */
	public static LogEvent(name: string, data: any) {

		console.log("1 -> try to log", name, data)
		console.log("2 -> try to log", name, data, AppCenterAnalytics)

		// FirebaseX.logEvent(name, data)
		// 	.then(function () {
		// 		console.log("FirebaseX analytics success", arguments)
		// 	},
		// 		function () {
		// 			console.log("FirebaseX analytics fail", arguments)
		// 		})
		AppCenterAnalytics.trackEvent(name, data)
			.then(function () {
				console.log("AppCenterAnalytics analytics success", arguments)
			},
				function () {
					console.log("AppCenterAnalytics analytics fail", arguments)
				})
	}
}