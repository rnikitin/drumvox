import React, { useRef, useEffect } from "react"
import { Stage } from "react-konva"
import * as Melodies from "../lib/KonnakolMelody"
import { KonnakolGame } from "../lib/KonnakolGame"
import { KonnakolGameAudio } from "../lib/KonnakolGameAudio"
import { AppContext } from "../AppContext"
import { reaction } from "mobx"

type KonnakolPlayerProps = {
    contentRef: React.RefObject<HTMLIonContentElement>
};

var melody = Melodies.TestMelody2

const KonnakolPlayer: React.FC<KonnakolPlayerProps> = (props) => {

    const stageRef = useRef<Stage>(null)
    let game: KonnakolGame
    let gameAudio: KonnakolGameAudio

    // On Component Mount
    useEffect(() => {

        // REACTIONS

        // react on play/pause change
        const reactionPlayingDisposer = reaction(() => AppContext.Player.playing, nowPlaying => {
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

        const reactionBpmDisposer = reaction(() => AppContext.Player.bpm, newBPM => {
            console.log("KonnakolPlayer.reaction.bpm", newBPM)

            game.changeBPM(newBPM)
            gameAudio.changeBPM(newBPM)
        })

        const reactionStopDisposer = reaction(() => AppContext.Player.stopping, newStopping => {
            console.log("KonnakolPlayer.reaction.stopping", newStopping)

            game.stop()
            gameAudio.stop()
        })

        // todo: fix this dirty hack goes here
        // start drawing later, because at the moment didMount size is not initialized yet
        setTimeout(() => {
            // get size of content area
            let contentRect = props.contentRef.current!.getBoundingClientRect()
            console.log("KonnakolPlayer Mount and Ready", contentRect)

            // render canvas stage
            game = new KonnakolGame(stageRef!.current!.getStage(), contentRect!.height, contentRect!.width, melody, AppContext.Player.bpm)
            gameAudio = new KonnakolGameAudio(melody, AppContext.Player.bpm)

        }, 1000)

        // unmount function
        return () => {
            reactionPlayingDisposer()
            reactionBpmDisposer()
        }
    }, [])

    return (
        <Stage ref={stageRef}>
        </Stage>
    )
}

export default KonnakolPlayer