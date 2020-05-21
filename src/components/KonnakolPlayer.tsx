import React, { useRef, useEffect } from "react"
import { Stage } from "react-konva"
import * as Melodies from "../lib/KonnakolMelody"
import { KonnakolGame } from "../lib/KonnakolGame"
import { KonnakolGameAudio } from "../lib/KonnakolGameAudio"
import { AppContext } from "../AppContext"
import { reaction, IReactionDisposer } from "mobx"
import { useIonViewWillEnter, useIonViewWillLeave, useIonViewDidEnter } from "@ionic/react"

type KonnakolPlayerProps = {
    contentRef: React.RefObject<HTMLIonContentElement>
    melody: Melodies.KonnakolMelody
};

const KonnakolPlayer: React.FC<KonnakolPlayerProps> = (props) => {

    const stageRef = useRef<Stage>(null)
    let game: KonnakolGame
    let gameAudio: KonnakolGameAudio
    let reactionPlayingDisposer: IReactionDisposer, reactionBpmDisposer: IReactionDisposer, reactionStopDisposer: IReactionDisposer

    useIonViewDidEnter(() => {
        registerReactions()

        // get size of content area
        let contentRect = props.contentRef.current!.getBoundingClientRect()
        console.log("KonnakolPlayer Mount and Ready", contentRect)

        // render canvas stage
        game = new KonnakolGame(stageRef!.current!.getStage(), contentRect!.height, contentRect!.width, props.melody, AppContext.Player.bpm)
        gameAudio = new KonnakolGameAudio(props.melody, AppContext.Player.bpm)
    })

    useIonViewWillLeave(() => {
        // dispose reactions
        reactionPlayingDisposer()
        reactionBpmDisposer()
        reactionStopDisposer()

        // todo: proper unmount for game & gameAudio
        game.stop()
        gameAudio.stop()
    })

    /**
     * REACTIONS
     */
    function registerReactions(){

        // react on play/pause change
        reactionPlayingDisposer = reaction(() => AppContext.Player.playing, nowPlaying => {
            console.log("KonnakolPlayer.reaction.playing", nowPlaying)

            if (nowPlaying) {
                game.play()
                gameAudio.play()
            }
            else {
                game.pause()
                gameAudio.pause()
            }
        })

        // react on BPM change
        reactionBpmDisposer = reaction(() => AppContext.Player.bpm, newBPM => {
            console.log("KonnakolPlayer.reaction.bpm", newBPM)

            game.changeBPM(newBPM)
            gameAudio.changeBPM(newBPM)
        })

        // react on stop
        reactionStopDisposer = reaction(() => AppContext.Player.stopping, newStopping => {
            console.log("KonnakolPlayer.reaction.stopping", newStopping)

            game.stop()
            gameAudio.stop()
        })
    }

    return (
        <Stage ref={stageRef}>
        </Stage>
    )
}

export default KonnakolPlayer