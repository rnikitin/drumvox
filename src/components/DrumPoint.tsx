import React from 'react';
import { IonCheckbox, IonCol } from '@ionic/react';

const colorOrange = "#ef6c00";

const DrumPointStyle = {
    "--size": "20px",
    "--checkmark-width": 0,
    "--background-checked": colorOrange,
    "--border-color-checked": colorOrange
  }


  interface DrumPointProps {
    tick: number;
    note: string;
    onToggle: (tick: number, note: string)=>void;
  }
  
  const DrumPoint: React.FC<DrumPointProps> = (props: DrumPointProps) => {
    return (
        <IonCol key={"col"+props.tick}>
            <IonCheckbox style={DrumPointStyle} class="drum-point" mode="ios" value={props.tick.toString()} onIonChange={togglePoint} />
        </IonCol>
    );

    function togglePoint(e:any){
        props.onToggle(props.tick, props.note);
    }
  };
  
  

  export default DrumPoint;
  