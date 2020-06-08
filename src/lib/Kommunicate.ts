import { Kommunicate } from "@ionic-native/kommunicate"

//Kommunicate.updatePushNotificationToken()

const config = {
	"authenticationTypeId" : 1,
	"applicationId" : "238e140d361ff6b07ce2806027dbc3af4",  //replace "applozic-sample-app" with Application Key from     Applozic Dashboard
	"deviceApnsType" : 0    //Set 0 for Development and 1 for Distribution (Release)
}

export const K = Kommunicate

export function KommunicateLogin(user_id: string, user_email: string){
	return K.login({...config, user_id, user_email })
}