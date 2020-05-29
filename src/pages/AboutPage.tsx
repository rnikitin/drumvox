import React, { useState } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonViewDidEnter, useIonViewWillEnter, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from "@ionic/react"
import { Analytics } from "../lib/Analytics"
import { AppVersion } from "@ionic-native/app-version"
import "./AboutPage.css"
import { womanOutline, manOutline, flowerOutline, musicalNotesOutline, rocketOutline } from "ionicons/icons"

type AboutPageState = {
	appName: string
	packageName: string
	versionCode: string | number
	versionNumber: string
}

const AboutPage: React.FC = () => {

	const [state, setState] = useState<AboutPageState>({
		appName: "Drumvox",
		packageName: "drumvox.web",
		versionCode: -1,
		versionNumber: "0.0.1"
	})

	useIonViewWillEnter(() => {
		Promise.all([AppVersion.getAppName(), AppVersion.getPackageName(), AppVersion.getVersionCode(), AppVersion.getVersionNumber()])
			.then((values) => {
				setState({
					appName: values[0].toString(),
					packageName: values[1].toString(),
					versionCode: values[2],
					versionNumber: values[3].toString()
				})
			})
	})

	useIonViewDidEnter(() => {
		Analytics.setCurrentScreen("AboutPage", {})
	})

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="end">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Drumvox - your drumming buddy</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="aboutContent">

				<IonCard>
					<IonCardHeader>
						<IonCardSubtitle>debug</IonCardSubtitle>
					</IonCardHeader>

					<IonItem>
						<IonLabel><strong>Application Name:</strong> {state.appName}</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel><strong>Package Name:</strong> {state.packageName}</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel><strong>Version Number:</strong> {state.versionNumber}</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel><strong>Version Code:</strong> {state.versionCode}</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel><strong>Screen Size:</strong> {window.innerWidth} x {window.innerHeight} x {window.devicePixelRatio}</IonLabel>
					</IonItem>

					<IonCardContent>If there are any problems with app, please include this information with your bug report.</IonCardContent>
				</IonCard>

				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Drumvox Team</IonCardTitle>
					</IonCardHeader>

					<IonItem>
						<IonIcon icon={musicalNotesOutline} slot="start" />
						<IonLabel>Mike Dolgov - konnakol guru, drum teacher</IonLabel>
					</IonItem>

					<IonItem>
						<IonIcon icon={rocketOutline} slot="start" />
						<IonLabel>Roman Nikitin - developer</IonLabel>
						<IonButton fill="outline" slot="end" href="javascript:window.open('https://teleg.one/neuromantic','_system', 'location=yes')" >telegram</IonButton>
					</IonItem>

					<IonItem>
						<IonIcon icon={flowerOutline} slot="start" />
						<IonLabel>Anastasia Axselrod - designer</IonLabel>
					</IonItem>

					<IonCardContent>Per Aspera Ad Astra!</IonCardContent>
				</IonCard>

				<IonCard>
					<IonCardHeader>
						<IonCardTitle>Special thanks</IonCardTitle>
					</IonCardHeader>

					<IonItem>
						<IonIcon icon={womanOutline} slot="start" />
						<IonLabel>Natalia Moshegova</IonLabel>
					</IonItem>

					<IonItem>
						<IonIcon icon={manOutline} slot="start" />
						<IonLabel>Sergius Kulikov</IonLabel>
					</IonItem>

					<IonItem>
						<IonIcon icon={manOutline} slot="start" />
						<IonLabel>Sergey Bastrykin</IonLabel>
					</IonItem>

					<IonItem>
						<IonIcon icon={womanOutline} slot="start" />
						<IonLabel>Maria Belyanskaya</IonLabel>
					</IonItem>

					<IonCardContent>Without your help the app wouldn&apos;t happen. Thank you folks!</IonCardContent>
				</IonCard>

			</IonContent>
		</IonPage>
	)
}

export default AboutPage