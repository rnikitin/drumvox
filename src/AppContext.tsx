import React, { createContext, Dispatch, useReducer } from "react"

type AppState = {
    playing: boolean,
    bpm: number
}

type Actions =
    | { type: "PLAY", playing: boolean }
    | { type: "SPEED", bpm: number }

const initialState: AppState = {
    playing: false,
    bpm: 60
}

const mainReducer = (state: AppState, action: Actions): AppState => {
    console.log("mainReducer", state, action)

    switch (action.type) {
        case "PLAY":
            return {...state, playing: action.playing }
        case "SPEED":
            return {...state, bpm: action.bpm }
        default:
            return state
    }
}

export const AppContext = createContext<{
    state: AppState;
    dispatch: Dispatch<Actions>;
}>({
    state: initialState,
    dispatch: () => null
})


export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}