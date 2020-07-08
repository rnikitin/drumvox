import React, { useRef, useState, useEffect } from 'react'
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonFooter, IonButton, IonIcon, useIonViewWillEnter, useIonViewDidEnter, IonMenuButton, useIonViewWillLeave } from '@ionic/react'
import KonnakolPlayerToolbar from '../components/KonnakolPlayerToolbar'
import DOMKonnakolGame from '../components/DOMKonnakolGame'
import { arrowBackOutline } from 'ionicons/icons'
import { RouteComponentProps } from 'react-router'
import { MelodiesStore } from '../lib/Firestore'
import { Analytics } from '../lib/Analytics'
import { KonnakolGame } from '../lib/KonnakolGame'
import { KonnakolGameAudio } from '../lib/KonnakolGameAudio'
import { reaction, observe } from 'mobx'
import { AppContext, PlayerState } from '../AppContext'
import { PowerManagement } from '@ionic-native/power-management'
import { KonnakolMelody } from '../lib/DataModels'
import { ScreenOrientation } from '@ionic-native/screen-orientation'

interface KanakolPlayerPagePageArgs extends RouteComponentProps<{
  melody_id: string
  collection_id: string
}> { }

const KonnakolPlayerPage: React.FC<KanakolPlayerPagePageArgs> = (props) => {
  const contentRef = useRef<HTMLIonContentElement>(null)

  const [melody, setMelody] = useState<KonnakolMelody>()
  const [loaded, setLoaded] = useState<boolean>(false)

  useIonViewWillEnter(() => {
    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE)
      .then(v => console.log('Screen orientation locked.', v),
        err => console.log('failed to lock orientation...', err))
  })


  useIonViewDidEnter(() => {
    load()
    handleDeviceEvents()

    Analytics.setCurrentScreen('KonnakolPlayerPage', { collection_id: props.match.params.collection_id, melody_id: props.match.params.melody_id })
  })

  useIonViewWillLeave(() => {
    ScreenOrientation.unlock()
  })

  useEffect(() => {
    console.log('KonnakolPlayerPage useEffect', loaded, melody)

    if (loaded) {
      // initialize player
      const desctructor = initPlayer()

      // return destruct function
      return () => desctructor()
    }
  }, [loaded])

  /**
   * initialize Konva and Tone players
   */
  function initPlayer() {

    // set a wakelock when entered page
    PowerManagement.acquire().then(() => {
      console.log('wakelock acquired')
    })

    // get size of content area
    const contentRect = contentRef.current!.getBoundingClientRect()
    console.log('KonnakolPlayerPage.initPlayer', contentRect, melody)

    // render canvas stage
    const game = new KonnakolGame(melody!, AppContext.Player.bpm)
    const gameAudio = new KonnakolGameAudio(melody!, AppContext.Player.bpm)

    const disposers = registerReactions(game, gameAudio)

    // return desctructor function
    return () => {
      AppContext.Player.state = PlayerState.Stopped

      // dispose reactions
      disposers.map((disposer) => disposer())

      game.destroy()
      gameAudio.destroy()

      // release wakelock since we leave the page
      PowerManagement.release().then(() => {
        console.log('wakelock released')
      })
    }
  }

  /**
   * Loads data
   */
  function load() {
    MelodiesStore.getMelody(props.match.params.collection_id, props.match.params.melody_id)
      .then((val) => {

        console.log('KonnakolPlayerPage.loaded melody', val)

        setMelody(val)
        setLoaded(true)
      })
  }

  function handleDeviceEvents() {
    // on device ready
    document.addEventListener('deviceready', () => {
      console.log('KonnakolPlayerPage.deviceready')
    })

    // on app pause
    document.addEventListener('pause', () => {
      console.log('KonnakolPlayerPage.device.pause')
      AppContext.Player.state = PlayerState.Paused
    })

    // on app resume
    document.addEventListener('resume', () => {
      console.log('KonnakolPlayerPage.device.resume')
    })
  }

  /**
  * REACTIONS
  */
  function registerReactions(game: KonnakolGame, gameAudio?: KonnakolGameAudio) {

    const observeStateDisposer = observe(AppContext.Player, 'state', (change) => {
      console.log(`KonnakolPlayer.observe state changed ${change.oldValue} to ${change.newValue}`)

      switch (change.newValue) {
        case PlayerState.Playing:

          if (change.oldValue == PlayerState.Stopped) {
            playWithPrecount()
          }
          else {
            resumePlaying()
          }
          break
        case PlayerState.Paused:
          pausePlaying()
          break

        case PlayerState.Stopped:
          stopPlaying()
          break
      }
    })

    function playWithPrecount() {
      gameAudio?.playWithPreCount(() => { })
      game?.play(gameAudio?.PRECOUNT_LENGTH)
    }

    function resumePlaying() {
      game?.resume()
      gameAudio?.play()
    }

    function pausePlaying() {
      game?.pause()
      gameAudio?.pause()
    }

    function stopPlaying() {
      game?.stop()
      gameAudio?.stop()
    }

    // react on BPM change
    const reactionBpmDisposer = reaction(() => AppContext.Player.bpm, newBPM => {
      console.log('KonnakolPlayer.reaction.bpm', newBPM)

      game?.changeBPM(newBPM)
      gameAudio?.changeBPM(newBPM)
    })

    return [observeStateDisposer, reactionBpmDisposer]
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerDirection={'back'} routerLink={`/collections/${props.match.params.collection_id}`} >
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{loaded ? melody?.name + ' — ' + melody?.description : '...'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} slot="fixed" forceOverscroll={false}>
        {loaded && melody && (<DOMKonnakolGame melody={melody} container={contentRef} />)}
      </IonContent>

      <IonFooter>
        <KonnakolPlayerToolbar />
      </IonFooter>

    </IonPage>
  )
}

export default KonnakolPlayerPage