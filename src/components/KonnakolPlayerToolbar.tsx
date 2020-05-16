import React, { useContext } from "react"
import { IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react"
import { play, pause } from "ionicons/icons"
import { AppContext } from "../AppContext"
import { bus, KonnakolPlayerPlayEvent } from "../lib/events"

const KonnakolPlayerToolbar: React.FC = () => {

    const { state, dispatch } = useContext(AppContext)

    const onPlayClicked = () => {
        console.log("onPlayClicked", state)

        dispatch({ type: "PLAY", playing: !state.playing })

        bus.publish(KonnakolPlayerPlayEvent({ playing: !state.playing }))
    }

    return (

        <IonToolbar>
            <IonButtons slot="start">
                <IonButton onClick={onPlayClicked}>
                    <IonIcon slot="icon-only" icon={state.playing ? pause : play} />
                </IonButton>
            </IonButtons>
        </IonToolbar>
    )
}

export default KonnakolPlayerToolbar