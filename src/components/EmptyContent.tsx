import React from "react"
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/react"
import "./EmptyContent.css"

const EmptyContent: React.FC = () => {

    return (
        <IonCard>
            <img className="empty-card-img" src="/assets/pics/skull.jpg" alt="DEADBEEF" />
            <IonCardHeader>
                <IonCardTitle>OMG!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                There is no content right now. Please check this section later!
			</IonCardContent>
        </IonCard>
    )
}

export default EmptyContent