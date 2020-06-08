import firebase from "firebase"
import firebaseApp from "../lib/Firebase"
import { Plugins } from "@capacitor/core"
import { getPlatforms } from "@ionic/react"
import { observable } from "mobx"
import { Analytics } from "./Analytics"
import { Intercom } from "./Intercom"
import { K, KommunicateLogin } from "./Kommunicate"



const firebaseAuth = firebaseApp.auth()

class AuthProvider {

	@observable currentUser?: firebase.User

	constructor() {

		firebaseAuth.onAuthStateChanged((value) => {
			console.log("AUTH: onAuthStateChanged", value)

			if (value) {
				this.currentUser = value!

				if (this.currentUser.isAnonymous) {
					Intercom.registerUnidentifiedUser()
				}
				else {
					Intercom.registerIdentifiedUser({ userId: this.currentUser.uid, email: this.currentUser.email! })
						.then(() => {
							Intercom.updateUser({
								customAttributes: {
									user_id: this.currentUser?.uid,
									name: this.currentUser?.displayName,
									email: this.currentUser?.email,
									created_at: this.currentUser?.metadata.creationTime,
									avatar: this.currentUser?.photoURL
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
			let googleUser = await Plugins.GoogleAuth.signIn()
			console.log("Plugins.GoogleAuth.signIn", googleUser)

			const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken)
			let user = await firebaseAuth.signInAndRetrieveDataWithCredential(credential)
			console.log("signInAndRetrieveDataWithCredential", user)
		}
		else {
			// otherwise try web signin
			var provider = new firebase.auth.GoogleAuthProvider()
			let result = await firebaseAuth.signInWithPopup(provider)
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