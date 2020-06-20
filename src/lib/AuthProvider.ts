import firebase from "firebase"
import firebaseApp from "../lib/Firebase"
import { Plugins, DeviceLanguageCodeResult } from "@capacitor/core"
import { getPlatforms } from "@ionic/react"
import { observable } from "mobx"
import { Analytics } from "./Analytics"
import { Intercom } from "./Intercom"
const { Device } = Plugins

const firebaseAuth = firebaseApp.auth()

class AuthProvider {

	@observable currentUser?: firebase.User

	constructor() {

		Device.getLanguageCode().then((result) => {
			console.log("device lang code = " + result.value)
		})


		firebaseAuth.onAuthStateChanged((value) => {
			console.log("AUTH: onAuthStateChanged", value)

			if (value) {
				this.currentUser = value!

				if (this.currentUser.isAnonymous) {
					Promise.all([Intercom.registerUnidentifiedUser(),
					Device.getLanguageCode()])
						.then(result => {
							const language = result[1]?.value ? result[1]?.value : "en"

							Intercom.updateUser({
								customAttributes: {
									user_id: this.currentUser?.uid,
									created_at: this.currentUser?.metadata.creationTime,
									language_override: language
								}
							})
						})
				}
				else {
					Promise.all([Intercom.registerIdentifiedUser({ userId: this.currentUser.uid, email: this.currentUser.email! }),
					Device.getLanguageCode()])
						.then(result => {
							const language = result[1]?.value ? result[1]?.value : "en"

							Intercom.updateUser({
								customAttributes: {
									user_id: this.currentUser?.uid,
									name: this.currentUser?.displayName,
									email: this.currentUser?.email,
									created_at: this.currentUser?.metadata.creationTime,
									avatar: this.currentUser?.photoURL,
									language_override: language
								}
							})
						})
				}
			}
			else {
				this.signInAnonym()
			}
		})
	}

	public async signInAnonym() {

		Analytics.LogEvent("Auth/Anoninymous", {})

		try {
			const value1 = await firebaseAuth.signInAnonymously()
			console.log("auth: signInAnonymously", value1)
		}
		catch (error1) {
			console.log("auth: ERROR signInAnonymously", error1)
		}
	}

	public async signInWithGoogle() {

		Analytics.LogEvent("Auth/Google", {})

		const platforms = getPlatforms()
		if (platforms.includes("android")) {
			// on android use this crappy plugin
			const googleUser = await Plugins.GoogleAuth.signIn()
			console.log("Plugins.GoogleAuth.signIn", googleUser)

			const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken)
			const user = await firebaseAuth.signInWithCredential(credential)
			console.log("signInWithCredential", user)
		}
		else {
			// otherwise try web signin
			const provider = new firebase.auth.GoogleAuthProvider()
			const result = await firebaseAuth.signInWithPopup(provider)
			console.log("signInWithPopup", result)
		}
	}

	public signOut() {
		Analytics.LogEvent("Auth/Signout", {})

		firebaseAuth.signOut()
		Intercom.logout()
	}
}

export default new AuthProvider()