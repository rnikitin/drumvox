
import { AppCenterAnalytics } from "@ionic-native/app-center-analytics"
import { app } from "./Firebase"

const fa = app.analytics()


export class Analytics {

	/**
	 * Automatically track custom event with Firebase and AppCenter
	 * @param name event name
	 * @param data event payload
	 */
	public static LogEvent(name: string, data: any) {

		fa.logEvent(name, data)
		AppCenterAnalytics.trackEvent(name, data)
	}


	public static setCurrentScreen(name: string, data: any) {

		fa.setCurrentScreen(name, data)

		AppCenterAnalytics.trackEvent("PageView", { ...data, screenName: name })
	}
}