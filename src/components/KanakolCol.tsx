import React, { useState } from "react"
import { IonCol } from "@ionic/react"
import "./KanakolCol.css"

type KonnakolColProp = {
    subscribeOnBeat: (callback: (tick: number) => void) => void;
    position: number;
}

const KanakolCol: React.FC<KonnakolColProp> = (props) => {
    let [beat, updateBeat] = useState(0)

    props.subscribeOnBeat((newBeat: number) => {
        updateBeat(newBeat)
    })
    
    return (<IonCol
        class={(beat === props.position) ? "kan-current" : ""}>
        { props.position }
    </IonCol>)
}

export default KanakolCol