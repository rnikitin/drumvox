import React, { useRef, useEffect } from "react"
import { Stage } from "react-konva"
import { bus, KonnakolPlayerPlayEvent } from "../lib/events"
import { TestMelody } from "../lib/KonnakolMelody"
import { KonnakolGame } from "../lib/KonnakolGame"
import { KonnakolGameAudio } from "../lib/KonnakolGameAudio"

type KonnakolPlayerProps = {
    contentRef: React.RefObject<HTMLIonContentElement>
};

var melody = TestMelody

const KonnakolPlayer: React.FC<KonnakolPlayerProps> = (props) => {

    const stageRef = useRef<Stage>(null)
    let game: KonnakolGame
    let gameAudio: KonnakolGameAudio

    // On Component Mount
    useEffect(() => {

        // EVENTS
        const konnakolPlayerPlayEventUnsubscribe = bus.subscribe(KonnakolPlayerPlayEvent, e => {
            console.log("KonnakolPlayer.KonnakolPlayerPlayEvent", e)

            if (e.payload.playing) {
                game.play()
                gameAudio.play()
            }
            else {
                game.pause()
                gameAudio.pause()
            }
        })

        // dirty hack goes here
        // start drawing later, because at the moment didMount size is not initialized yet
        setTimeout(() => {
            // get size of content area
            let contentRect = props.contentRef.current!.getBoundingClientRect()
            console.log("KonnakolPlayer Mount and Ready", contentRect)

            // render canvas stage
            game = new KonnakolGame(stageRef!.current!.getStage(), contentRect!.height, contentRect!.width, melody)
            gameAudio = new KonnakolGameAudio(melody)

        }, 1000)

        // unmount function
        return () => {
            konnakolPlayerPlayEventUnsubscribe()
        }
    }, [])

    return (
        <Stage ref={stageRef}>
        </Stage>
    )
}

export default KonnakolPlayer