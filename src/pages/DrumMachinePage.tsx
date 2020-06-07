import React, { useState, useEffect } from "react"
import { IonCol, IonRange, IonLabel, IonRow, IonGrid, IonContent, IonFab, IonFabButton, IonIcon, useIonViewWillEnter, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonViewDidEnter, IonButton, IonSegment, IonSegmentButton } from "@ionic/react"
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

    const [sequenceSize, setSequenceSize] = useState(8)
    
    let dm = new SSDM.DrumMachine(sequenceSize, notifyDrumPointComponents)

    useIonViewDidEnter(() => {
        Analytics.setCurrentScreen("DrumMachinePage", {})
    })

    //const [playing, setPlaying] = useState(false)
    const beatCallbacks: Array<(tick: number) => void> = []

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
        for (let i = 1; i <= sequenceSize; i++) {
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
    for (let k = 1; k <= sequenceSize; k++) {
        kanakolColumns.push(<KanakolCol key={"kan" + k} position={k} subscribeOnBeat={subscriberOnBeat} />)
    }

    function sequenceSizeChange(value: string) {
        console.log("sequenceSizeChange", value)
        stopHandle()
        setSequenceSize(Number(value))
        // create new drum machine
        dm.destroy()
        dm = new SSDM.DrumMachine(sequenceSize, notifyDrumPointComponents)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="ios">
                    <IonButtons slot="start">
                        <IonButton color="dark" routerDirection={"back"} routerLink={"/collections"} >
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonMenuButton color="dark" />
                    </IonButtons>
                    <IonSegment mode="ios" value={sequenceSize.toString()} onIonChange={e => sequenceSizeChange(e.detail.value!)} color="primary">
                        <IonSegmentButton value="4">
                            <IonLabel>4</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="8">
                            <IonLabel>8</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="12">
                            <IonLabel>12</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="16">
                            <IonLabel>16</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
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
                                value={SSDM.DEFAULT_BPM}
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