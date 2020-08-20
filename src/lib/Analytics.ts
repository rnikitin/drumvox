import { AppCenterAnalytics } from '@ionic-native/app-center-analytics'
//import { Intercom } from './Intercom'
import { UniversalFirebaseAnalytics } from './Firebase'

export class Analytics {

	/**
	 * Automatically track custom event with Firebase and AppCenter
	 * @param name event name
	 * @param data event payload
	 */
	public static LogEvent(name: string, data: any) {

		setTimeout(() => {
			UniversalFirebaseAnalytics.logEvent(name, data)
			AppCenterAnalytics.trackEvent(name, data)
			//Intercom?.logEvent({ name, data }).then(() => 1, (err) => console.error(err))
		})
	}


	public static setCurrentScreen(name: string, data: any) {

		setTimeout(() => {
			UniversalFirebaseAnalytics.setCurrentScreen(name)
			AppCenterAnalytics.trackEvent('PageView', { ...data, screenName: name })
			//Intercom.logEvent({ name: 'PageView/' + name, data: data })
		})
	}
}