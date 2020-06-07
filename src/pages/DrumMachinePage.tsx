import React, { useState } from "react"
import { IonCol, IonRange, IonLabel, IonRow, IonGrid, IonContent, IonFab, IonFabButton, IonIcon, useIonViewWillEnter, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonViewDidEnter, IonButton } from "@ionic/react"
import { play, pause, stop, trash, arrowBackOutline } from "ionicons/icons"
import DrumPoint from "../components/DrumPoint"
import KanakolCol from "../components/KanakolCol"
import * as SSDM from "../lib/StupidSimpleDrumMachine"
import { Analytics } from "../lib/Analytics"
import "./DrumMachinePage.css"
import { observable } from "mobx"
import { observer, Observer } from "mobx-react"

type DrumMachineProps = {

}

class DrumMachinePageState {
    @observable playing: boolean = false
}


export const DrumMachinePage: React.FC<DrumMachineProps> = () => {

    const [state, setState] = useState({
        forceReload: 0
    })

    console.log("DrumMachineComponent.init")
    //const state = new DrumMachinePageState()

    useIonViewDidEnter(() => {
        Analytics.setCurrentScreen("DrumMachinePage", {})
    })

    //const [playing, setPlaying] = useState(false)
    const beatCallbacks: Array<(tick: number) => void> = []

    const dm = new SSDM.DrumMachine(notifyDrumPointComponents)

    /// HANDLERS
    function notifyDrumPointComponents(newBeat: number) {
        console.log("DrumMachineComponent.notifyDrumPointComponents", newBeat)
        beatCallbacks.forEach((callback) => callback(newBeat))
    }

    function subscriberOnBeat(callback: (beat: number) => void) {
        //console.log("DrumMachineComponent.subscriberOnBeat")
        beatCallbacks.push(callback)
    }

    function togglePlayPause() {
        console.log("DrumMachineComponent.togglePlayPause")

        if (!dm.playing) {
            dm.start()
        }
        else {
            dm.pause()
        }

        console.log("DrumMachineComponent.togglePlayPause", dm.playing)
    }

    function stopHandle() {
        dm.stop()
        setTimeout(() => {
            notifyDrumPointComponents(0)
        }, 50)
    }

    function resetHandle() {
        stopHandle()
        dm.resetMelody()
    }

    function changeBPM(e: any) {
        let newBpm = e.target.value
        console.log("DrumMachineComponent.changeBPM", newBpm)
        dm.setBPM(newBpm)
    }

    function togglePlayer(tick: number, note: string) {
        console.log("DrumMachineComponent.togglePlayer", tick, note)
        dm.toggleBeat(tick, note)
    }

    const drumPointRows: any[] = []
    // iterate all notes
    for (let drumNote in SSDM.DRUM_NOTES) {
        var drumPointColumns = []

        // iterate through sequence size
        for (let i = 1; i <= SSDM.SEQUENCE_SIZE; i++) {
            drumPointColumns.push(<DrumPoint key={"dp" + i} tick={i} note={drumNote} onToggle={togglePlayer} />)
        }

        drumPointRows.push(<IonRow key={"row" + drumNote}>
            <IonCol size="1">{drumNote}</IonCol>
            {drumPointColumns}
        </IonRow>)
    }

    // kanakol row
    var kanakolColumns: any[] = []
    // push first empy column
    kanakolColumns.push(<IonCol key="kan00" size="1" />)
    // add kanakol notes
    for (let k = 1; k <= SSDM.SEQUENCE_SIZE; k++) {
        kanakolColumns.push(<KanakolCol key={"kan" + k} position={k} subscribeOnBeat={subscriberOnBeat} />)
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerDirection={"back"} routerLink={"/collections"} >
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Stupid Simple Drum Machine</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid class="ssdm-players-grid">
                    {drumPointRows}
                    <IonRow class="row-kanakol">
                        {kanakolColumns}
                    </IonRow>
                </IonGrid>

                <IonGrid class="ssdm-controls">
                    <IonRow>
                        <IonCol size="3">
                            <IonFab vertical="bottom" horizontal="start">

                                <IonFabButton color="danger" onClick={togglePlayPause}>
                                    <Observer >{
                                        () => <IonIcon icon={dm.playing ? pause : play} />
                                    }
                                    </Observer>
                                </IonFabButton>
                            </IonFab>
                            <IonFab vertical="bottom" horizontal="end">
                                <IonFabButton color="light" onClick={stopHandle} size="small">
                                    <IonIcon icon={stop} />
                                </IonFabButton>
                            </IonFab>
                        </IonCol>
                        <IonCol size="9">
                            <IonRange
                                min={50}
                                max={250}
                                color="danger"
                                mode="ios"
                                pin={true}
                                snaps={true}
                                step={5}
                                ticks={false}
                                value={dm.bpm}
                                onIonChange={changeBPM}
                                debounce={250}>
                                <IonLabel slot="start">50</IonLabel>
                                <IonLabel slot="end">250</IonLabel>
                            </IonRange>
                        </IonCol>
                    </IonRow>
                </IonGrid>



            </IonContent>

        </IonPage>
    )
}