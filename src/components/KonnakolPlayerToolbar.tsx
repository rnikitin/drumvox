import React from "react"
import { IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from "@ionic/react"
import { Observer } from "mobx-react"
import { play, pause, addCircleOutline, removeCircleOutline, stop } from "ionicons/icons"
import { AppContext } from "../AppContext"
import { Analytics } from "../lib/Analytics"

const BPM_STEP = 10

const KonnakolPlayerToolbar: React.FC = () => {

    const onPlay = () => {
        console.log("onPlay", AppContext.Player.playing)

        AppContext.Player.playing = !AppContext.Player.playing

        Analytics.LogEvent("KonnakolPlayerToolbar.Play", {playing: (AppContext.Player.playing ? 1: 0)})
    }

    const onChangeBpm = (change: number) => {
        console.log("onChangeBpm", AppContext.Player.bpm)

        AppContext.Player.bpm = AppContext.Player.bpm + change

        Analytics.LogEvent("KonnakolPlayerToolbar.ChangeBpm", {bpm: AppContext.Player.bpm})
    }

    const onStop = () => {
        console.log("onStop", AppContext.Player.stopping)

        AppContext.Player.playing = false
        AppContext.Player.stopping++

        Analytics.LogEvent("KonnakolPlayerToolbar.Stop", {stopping: AppContext.Player.stopping})
    }

    return (
        <IonToolbar>
            <IonButtons slot="start">
                <Observer>
                    {
                        () => (
                            <IonButton onClick={onPlay}>
                                <IonIcon slot="icon-only" icon={AppContext.Player.playing ? pause : play} />
                            </IonButton>
                        )
                    }
                </Observer>
                <IonButton onClick={onStop}>
                    <IonIcon slot="icon-only" icon={stop} />
                </IonButton>
                <IonButton onClick={() => onChangeBpm(-BPM_STEP)}>
                    <IonIcon slot="icon-only" icon={removeCircleOutline} />
                </IonButton>
                <Observer>
                    {
                        () => (
                            <IonTitle>{AppContext.Player.bpm}</IonTitle>
                        )
                    }
                </Observer>
                <IonButton onClick={() => onChangeBpm(+BPM_STEP)}>
                    <IonIcon slot="icon-only" icon={addCircleOutline} />
                </IonButton>
            </IonButtons>
        </IonToolbar>
    )
}

export default KonnakolPlayerToolbar