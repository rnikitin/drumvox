import React from "react"
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonIcon, IonLabel, IonAvatar } from "@ionic/react"
import AuthProvider from "../lib/AuthProvider"
import "./RightMenu.css"
import { Observer } from "mobx-react"
import { logoGoogle, medalOutline, informationCircleOutline, musicalNotesOutline } from "ionicons/icons"


const RightMenu: React.FC = () => {

	function signInWithGoogle() {
		AuthProvider.signInWithGoogle()
	}

	function signOut() {
		AuthProvider.signOut()
	}

	return (
		<IonMenu side="end" menuId="first" contentId="mainContent">
			<IonHeader>
				<IonToolbar>

					<Observer>
						{
							() => (<IonTitle class="b-userinfo">
								{AuthProvider.currentUser?.isAnonymous &&
									<IonButton fill="outline" color="danger" onClick={signInWithGoogle}>
										<IonIcon slot="start" icon={logoGoogle} />
										Sign in with Google
									</IonButton>}

								{!AuthProvider.currentUser?.isAnonymous &&
									<IonItem>
										<IonAvatar slot="start">
											<img src={AuthProvider.currentUser?.photoURL!} />
										</IonAvatar>
										<IonLabel>
											{AuthProvider.currentUser?.displayName}
										</IonLabel>
									</IonItem>}
							</IonTitle>)
						}
					</Observer>

				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<IonItem href="/collections">
						<IonIcon slot="start" icon={medalOutline} />
						<IonLabel>Exercises</IonLabel>
					</IonItem>
					<IonItem href="/drumMachine">
						<IonIcon slot="start" icon={musicalNotesOutline} />
						<IonLabel>Stupid Simple Drum Machine</IonLabel>
					</IonItem>
					<IonItem href="/about">
						<IonIcon slot="start" icon={informationCircleOutline} />
						About the App
						</IonItem>
				</IonList>

				<div className="b-signout">
					<Observer>
						{
							() => (AuthProvider.currentUser?.isAnonymous ? <div></div> : <IonButton size="small" color="dark" fill="clear" onClick={signOut}>Sign out</IonButton>)
						}
					</Observer>
				</div>

			</IonContent>
		</IonMenu>
	)
}

export default RightMenu


