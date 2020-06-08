import { Intercom } from "capacitor-intercom"
import { Kommunicate } from "@ionic-native/kommunicate"
import { Plugins } from "@capacitor/core"
const { PushNotifications } = Plugins

PushNotifications.register()
	

export default new Intercom()