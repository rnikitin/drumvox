import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';


interface BigFabButtonProps {
    onClick?: ((event: React.MouseEvent<HTMLIonFabButtonElement, MouseEvent>) => void) | undefined;
    icon: string;
    color: string;
}

const BigFabButtonStyle = {
    "width": "100px",
    "height": "100px"
}

export const BigFabButton: React.FC<BigFabButtonProps> = (props) => {
    return (
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton color={props.color} style={BigFabButtonStyle} onClick={props.onClick}>
                <IonIcon icon={ props.icon } />
            </IonFabButton>
        </IonFab>
    );
  };