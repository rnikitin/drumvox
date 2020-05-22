import React, { useRef, useState, useEffect } from "react"
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonFooter, IonButton, IonIcon, useIonViewWillEnter, useIonViewDidEnter, useIonViewWillLeave } from "@ionic/react"
import KonnakolPlayerToolbar from "../components/KonnakolPlayerToolbar"
import { arrowBackOutline } from "ionicons/icons"
import { RouteComponentProps } from "react-router"
import { Melody } from "../lib/DataModels"
import { MelodiesStore } from "../lib/Firestore"
import { Analytics } from "../lib/Analytics"
import { Stage } from "react-konva"
import { KonnakolGame } from "../lib/KonnakolGame"
import { KonnakolGameAudio } from "../lib/KonnakolGameAudio"
import { IReactionDisposer, reaction, observable } from "mobx"
import { AppContext } from "../AppContext"

interface KanakolPlayerPagePageArgs extends RouteComponentProps<{
  melody_id: string
  collection_id: string
}> { }

const KonnakolPlayerPage: React.FC<KanakolPlayerPagePageArgs> = (props) => {
  const contentRef = useRef<HTMLIonContentElement>(null)
  const stageRef = useRef<Stage>(null)

  const [melody, setMelody] = useState<Melody>()
  const [loaded, setLoaded] = useState<boolean>(false)

  useIonViewWillEnter(() => {

    console.log("KonnakolPlayerPage.useIonViewWillEnter loaded=", loaded)

    load()
  })

  useIonViewDidEnter(() => {
    console.log("KonnakolPlayerPage.useIonViewDidEnter loaded=", loaded)

    Analytics.setCurrentScreen("KonnakolPlayerPage", { collection_id: props.match.params.collection_id, melody_id: props.match.params.melody_id })
  })

  useIonViewWillLeave(() => {

    console.log("KonnakolPlayerPage.useIonViewWillLeave")
  })

  useEffect(() => {
    console.log("KonnakolPlayerPage.useEffect", loaded, melody)

    if (loaded) {
      // initialize player
      const desctructor = initPlayer()

      // return destruct function
      return () => desctructor()
    }
  })

  /**
   * initialize Konva and Tone players
   */
  function initPlayer() {

    // get size of content area
    let contentRect = contentRef.current!.getBoundingClientRect()
    console.log("KonnakolPlayerPage.initPlayer", contentRect, melody)

    // render canvas stage
    const game = new KonnakolGame(stageRef!.current!.getStage(), contentRect!.height, contentRect!.width, melody!, AppContext.Player.bpm)
    const gameAudio = new KonnakolGameAudio(melody!, AppContext.Player.bpm)

    let [reactionPlayingDisposer, reactionBpmDisposer, reactionStopDisposer] = registerReactions(game, gameAudio)

    // return desctructor function
    return () => {
      // dispose reactions
      reactionPlayingDisposer()
      reactionBpmDisposer()
      reactionStopDisposer()

      // todo: proper unmount and destroy for game & gameAudio
      game?.stop()
      gameAudio?.stop()
    }
  }

  function load() {
    MelodiesStore.getMelody(props.match.params.collection_id, props.match.params.melody_id)
      .then((val) => {

        console.log("load")

        setMelody(val)
        setLoaded(true)
      })
  }

  /**
  * REACTIONS
  */
  function registerReactions(game: KonnakolGame, gameAudio: KonnakolGameAudio) {

    // react on play/pause change
    const reactionPlayingDisposer = reaction(() => AppContext.Player.playing, nowPlaying => {
      console.log("KonnakolPlayer.reaction.playing", nowPlaying)

      if (nowPlaying) {
        game?.play()
        gameAudio?.play()
      }
      else {
        game?.pause()
        gameAudio?.pause()
      }
    })

    // react on BPM change
    const reactionBpmDisposer = reaction(() => AppContext.Player.bpm, newBPM => {
      console.log("KonnakolPlayer.reaction.bpm", newBPM)

      game?.changeBPM(newBPM)
      gameAudio?.changeBPM(newBPM)
    })

    // react on stop
    const reactionStopDisposer = reaction(() => AppContext.Player.stopping, newStopping => {
      console.log("KonnakolPlayer.reaction.stopping", newStopping)

      game?.stop()
      gameAudio?.stop()
    })

    return [reactionPlayingDisposer, reactionBpmDisposer, reactionStopDisposer]
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerDirection={"back"} routerLink={`/collections/${props.match.params.collection_id}`} >
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{loaded ? melody?.name : "..."}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} slot="fixed" forceOverscroll={false}>
        <Stage ref={stageRef}></Stage>
      </IonContent>

      <IonFooter>
        <KonnakolPlayerToolbar />
      </IonFooter>

    </IonPage>
  )
}

export default KonnakolPlayerPage