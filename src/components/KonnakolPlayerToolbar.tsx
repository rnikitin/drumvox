import React from "react"
import { IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonText } from "@ionic/react"
import { Observer } from "mobx-react"
import { playOutline, pauseOutline, addCircleOutline, removeCircleOutline, stopOutline } from "ionicons/icons"
import { AppContext, PlayerState } from "../AppContext"
import { Analytics } from "../lib/Analytics"

import "./KonnakolPlayerToolbar.css"

const BPM_STEP = 10

const KonnakolPlayerToolbar: React.FC = () => {

    const onPlay = () => {
        console.log("onPlay", AppContext.Player.state)

        AppContext.Player.state = AppContext.Player.state == PlayerState.Playing ? PlayerState.Paused : PlayerState.Playing

        Analytics.LogEvent("Player.StateChange", { playerState: AppContext.Player.state })
    }

    const onChangeBpm = (change: number) => {
        console.log("onChangeBpm", AppContext.Player.bpm)

        AppContext.Player.bpm = AppContext.Player.bpm + change

        Analytics.LogEvent("KonnakolPlayerToolbar.ChangeBpm", { bpm: AppContext.Player.bpm })
    }

    const onStop = () => {
        console.log("onStop", AppContext.Player.state)

        AppContext.Player.state = PlayerState.Stopped

        Analytics.LogEvent("Player.StateChange", { playerState: AppContext.Player.state })
    }

    return (
        <IonToolbar>
            <IonButtons slot="start" className="toolbar-controls">
                <IonButton onClick={() => onChangeBpm(-BPM_STEP)}>
                    <IonIcon slot="icon-only" icon={removeCircleOutline} />
                </IonButton>
                <Observer>
                    {
                        () => (
                            <IonText className="control-speed">
                                <div className="control-speed-bpm">{AppContext.Player.bpm}</div>
                                <div className="control-speed-label">SPEED</div>
                            </IonText>
                        )
                    }
                </Observer>
                <IonButton onClick={() => onChangeBpm(+BPM_STEP)}>
                    <IonIcon slot="icon-only" icon={addCircleOutline} />
                </IonButton>


                <IonButton className="controls-stop" onClick={onStop}>
                    <IonIcon slot="icon-only" icon={stopOutline} />
                </IonButton>

                <Observer>
                    {
                        () => (
                            <IonButton onClick={onPlay}>
                                <IonIcon slot="icon-only" icon={AppContext.Player.state == PlayerState.Playing ? pauseOutline : playOutline} />
                            </IonButton>
                        )
                    }
                </Observer>


            </IonButtons>

        </IonToolbar>
    )
}

export default KonnakolPlayerToolbar