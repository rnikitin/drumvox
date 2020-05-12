import React from 'react';
import { IonCol, IonRange, IonLabel, IonRow, IonGrid, IonContent } from '@ionic/react';
//import Tone from 'tone/Tone';
import * as Tone from "tone";
import { play, pause } from 'ionicons/icons';
import DrumPoint from './DrumPoint';
import KanakolCol from './KanakolCol';
import { BigFabButton } from './FabButtons';

type DrumMachineProps = {

}

type DrumControlState = {
    melody:string[][];
    sequencer:number[];
    bpm: number;
    currentBeat: number;
}

type DrumMachineState = {
    isPlaying: boolean;
}

// size of playing sequence, constant for now
const SEQUENCE_SIZE = 8;
// Our set of drum notes with mp3
const DRUM_NOTES = {
    "Ride" : "/assets/audio/drumvox/ride.mp3",
    "HH" : "/assets/audio/drumvox/hh.mp3",
    "Kick" : "/assets/audio/drumvox/kick.mp3",
    "Snare" : "/assets/audio/drumvox/snare.mp3",
};

class DrumMachine extends React.Component<DrumMachineProps, DrumMachineState> {
    state:DrumMachineState = {
        isPlaying: false
    }

    controls: DrumControlState = {
        melody: [],
        sequencer: [],
        bpm: 80,
        currentBeat: 0
    }

    drumPlayers: Tone.Players;
    beatCallbacks: Array<(tick: number)=>void> = [];

    constructor(props:DrumMachineProps){
        super(props);

        // generate sequence and empty melody
        for (let i = 1; i <= SEQUENCE_SIZE; i++){
            this.controls.melody[i] = [];
            this.controls.sequencer.push(i);
        }

        // init Tone Seqeuncer and Transport
        Tone.Transport.bpm.value = this.controls.bpm;

        this.drumPlayers = new Tone.Players(DRUM_NOTES, () => {
            this.drumPlayers.volume.value = -10;
            this.drumPlayers.toMaster();
          
            console.log("drums loaded");
          });
          
          Tone.Transport.bpm.value = 80;
            
          var seq = new Tone.Sequence(this.sequencerCallback.bind(this), this.controls.sequencer, "4n");
          seq.start();
    }
    
    sequencerCallback(time:number, beat:number){
        console.log(time, beat);

        // play some notes
        if (this.controls.melody[beat].length > 0){
            for(let i=0; i < this.controls.melody[beat].length; i++){
                let note = this.controls.melody[beat][i];

                this.drumPlayers.player(note).start(time, 0, "8n");
            }
        }
        
        // update UI
        Tone.Draw.schedule(() => {
            this.updateBeat(beat);
        }, time + 0.025);
    }

    componentDidMount() {
        console.log('componentDidMount');
    }
  
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    togglePlayPause(){
        if (Tone.Transport.state !== "started"){
            Tone.Transport.start();
            this.setState({isPlaying: true});
        }
        else { 
            Tone.Transport.pause();
            this.setState({isPlaying: false});
        }
    }

    changeBPM(e:any){
        let newBpm = e.target.value;
        Tone.Transport.bpm.value = newBpm;
        this.controls.bpm = newBpm;
    }

    togglePlayer(tick:number, note: string){

        let idx = this.controls.melody[tick].indexOf(note);
        if (idx > -1){
            // remove note
            this.controls.melody[tick].splice(idx, 1);
        }
        else {
            // add note
            this.controls.melody[tick].push(note);
        }
    }

    updateBeat(newBeat: number){
        this.controls.currentBeat = newBeat;
        this.beatCallbacks.forEach((callback) => callback(newBeat));
    }

    subscribeToBeat(callback: (beat: number)=>void){
        this.beatCallbacks.push(callback);
    }

    render(){
        console.log('DrumMachine.render');
        
        var drumPointRows = [];
        // iterate all notes
        for(let drumNote in DRUM_NOTES){
        var drumPointColumns = [];
    
        // iterate through sequence size
        for (let i = 1; i <= SEQUENCE_SIZE; i++){
            drumPointColumns.push(<DrumPoint key={"dp"+i} tick={i} note={drumNote} onToggle={this.togglePlayer.bind(this)} />);
        }
    
        drumPointRows.push(<IonRow key={"row" + drumNote}>
                                <IonCol size="2">{drumNote}</IonCol>
                                {drumPointColumns}
                            </IonRow>);
        }
  
        // kanakol row
        var kanakolColumns = [];
        // push first empy column
        kanakolColumns.push(<IonCol key="kan00" size="2" />);
        // add kanakol notes
        for (let k = 1; k <= SEQUENCE_SIZE; k++){
            //kanakolColumns.push(<IonCol class={(this.state.currentStep == k) ? "kan-current" : ""} key={"kan"+k}>{KANAKOL_NOTES[k % 4]}</IonCol>);
            kanakolColumns.push(<KanakolCol key={"kan"+k} position={k} onBeat={this.subscribeToBeat.bind(this)} />)
        }

        return (<IonContent class="ion-padding">
                    <IonGrid>
                        {drumPointRows}
                        <IonRow class="row-kanakol">{kanakolColumns}</IonRow>
                    </IonGrid>
                    <IonRange min={50} max={250} color="danger" mode="ios" pin={true} value={this.controls.bpm} onIonChange={this.changeBPM.bind(this)} debounce={250}>
                        <IonLabel slot="start">50</IonLabel>
                        <IonLabel slot="end">250</IonLabel>
                    </IonRange>
            
                    {/* <IonFab vertical="bottom" horizontal="start" slot="fixed">
                        <IonFabButton color="danger" onClick={this.togglePlayPause.bind(this)}>
                            <IonIcon icon={ this.state.isPlaying ? pause : play } />
                        </IonFabButton>
                    </IonFab> */}

                    <BigFabButton color="danger" 
                                  icon={ this.state.isPlaying ? pause : play } 
                                  onClick={this.togglePlayPause.bind(this)} />


            </IonContent>)
    }
} 

export default DrumMachine;
  