import React, { useRef, useEffect } from "react"
import { Stage } from "react-konva"
import { KonnakolGame } from "../lib/KonnakolGame"
import { KonnakolGameAudio } from "../lib/KonnakolGameAudio"
import { AppContext } from "../AppContext"
import { reaction, IReactionDisposer } from "mobx"
import { useIonViewWillEnter, useIonViewWillLeave, useIonViewDidEnter } from "@ionic/react"
import { Melody } from "../lib/DataModels"

type KonnakolPlayerProps = {
    contentRef: React.RefObject<HTMLIonContentElement>
    melody: Melody
};

const KonnakolPlayer: React.FC<KonnakolPlayerProps> = (props) => {

    console.log("KonnakolPlayer", props)

    const stageRef = useRef<Stage>(null)
    let game: KonnakolGame
    let gameAudio: KonnakolGameAudio
    let reactionPlayingDisposer: IReactionDisposer, reactionBpmDisposer: IReactionDisposer, reactionStopDisposer: IReactionDisposer
    let alreadyInitialized = false

    useIonViewWillEnter(() => {
        console.log("useIonViewWillEnter")   
    })

    useIonViewDidEnter(() => {
        console.log("useIonViewDidEnter")   
      
    })

    useEffect(() => {
        console.log("useEffect")

    })

    return (<div>hello</div>)
}

export default KonnakolPlayer