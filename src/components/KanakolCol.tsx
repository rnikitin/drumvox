import React from 'react';
import { IonCol } from '@ionic/react';

import './KanakolCol.css';

// note 4 = 0
const KANAKOL_NOTES = ["Mi", "Ta", "Ka", "Di"];

type KanakolColState = {
    currentBeat: number;
}

type KanakolColProp = {
    onBeat: (callback: (tick: number)=>void) => void;
    position: number;
}

class KanakolCol extends React.PureComponent<KanakolColProp, KanakolColState> {

    state: KanakolColState = {
        currentBeat: 0
    }

    constructor(props:KanakolColProp){
        super(props);

        props.onBeat(this.beat.bind(this));
    }

    beat(newBeat: number){
        this.setState({currentBeat: newBeat});
    }

    render(){
        return (<IonCol 
                    class={(this.state.currentBeat == this.props.position) ? "kan-current" : ""}>
                        {KANAKOL_NOTES[this.props.position % 4]}
                </IonCol>);
    }
}

export default KanakolCol;