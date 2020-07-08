import { KonnakolMelody, MelodyBeat } from '../lib/DataModels'
import React from 'react'
import * as CONST from '../lib/KonnakolGameConstants'

import './DOMKonnakolGame.css'
import { posix } from 'path'

interface DOMKOnnakolGameProps {
    melody: KonnakolMelody
    container: React.RefObject<HTMLIonContentElement>
}

const gameContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%'
}

const melodyContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%'
}

const DOMKOnnakolGame: React.FC<DOMKOnnakolGameProps> = (props: DOMKOnnakolGameProps) => {

    console.log('DOMKOnnakolGame', props)

    const GAME_HEIGHT = () => CONST.GROUP_HEIGHT * (props?.melody?.instruments.length! + 2)
    const OFFSET_Y = () => (props?.container.current?.clientHeight! - GAME_HEIGHT()) * 0.5

    let lastRenderedBeat: MelodyBeat | null = null

    function renderMelody() {
        const melodyElements: JSX.Element[] = []

        // count of melodies to render ahead
        const melodies_ahead_count = 3
        console.log('render melody. ahead=', melodies_ahead_count)

        // render melodies
        for (let i = 0; i < melodies_ahead_count; i++) {

            // render melody
            const melodyBeatsElements = props.melody.beats.map((beat, n) => {
                lastRenderedBeat = beat
                // offsetX = base offset + offset for current beat + whole melody offset
                return renderBeatGroup(beat, n, n * CONST.BEAT_WIDTH)
            })

            melodyElements.push(<div
                key={'melody' + i}
                className='melody-block'
                style={{
                    left: CONST.BEAT_START_OFFSET_X + (i * props.melody.beats.length * CONST.BEAT_WIDTH) + CONST.BEAT_WIDTH,
                    top: OFFSET_Y(),
                    width: props.melody.beats.length * CONST.BEAT_WIDTH,
                    height: GAME_HEIGHT()
                }}>
                {melodyBeatsElements}
            </div>)
        }

        return melodyElements
    }

    function renderBeatGroup(beat: MelodyBeat, beatIdx: number, offsetX: number) {

        console.log('renderBeatGroup', beatIdx, offsetX)

        // render melody start indicator
        let startIndicator = <span></span>
        if (beatIdx === 0) {
            startIndicator = <div style={{
                backgroundColor: CONST.COLOR_MELODY_START_LINE,
                position: 'absolute',
                left: CONST.BEAT_RADIUS,
                top: 0,
                width: 1,
                height: props.melody.instruments.length * CONST.GROUP_HEIGHT + 4
            }}>&nbsp;</div>
        }

        // render beats
        const beatNotesElements = beat.notes.map(note => {
            // find instrument
            const instrumentIndex = props.melody.instruments.indexOf(note)
            // render
            return (<div key={beatIdx + note} style={{
                position: 'absolute',
                left: 0,
                top: instrumentIndex * CONST.GROUP_HEIGHT,
                width: 2 * CONST.BEAT_RADIUS,
                height: 2 * CONST.BEAT_RADIUS,
                borderRadius: '50%',
                backgroundColor: beat.main ? CONST.COLOR_BEAT_MAIN : CONST.COLOR_BEAT_SECONDARY

            }}>&nbsp;</div>)
        })

        return <div className="beat-group" key={'beat' + offsetX}
            style={{
                position: 'absolute',
                left: offsetX,
                top: 0,
                width: CONST.BEAT_WIDTH,
                height: (props.melody.instruments.length + 2) * CONST.GROUP_HEIGHT,
            }}>
            {startIndicator}
            {beatNotesElements}
            <div style={{
                position: 'absolute',
                left: CONST.BEAT_RADIUS - 6,
                bottom: CONST.GROUP_HEIGHT,
                fontSize: '1em',
                color: CONST.COLOR_TEXT,
                textAlign: 'center'

            }}>{beat.num}</div>
            <div style={{
                position: 'absolute',
                left: CONST.BEAT_RADIUS - 8,
                bottom: 0,
                fontSize: '1em',
                color: beat.main ? CONST.COLOR_KONNAKOL_MAIN : CONST.COLOR_BEAT_SECONDARY,
                textAlign: 'center'
            }}>{beat.konnakol}</div>
        </div>
    }

    function renderInstruments() {
        const instrumentElements: JSX.Element[] = []

        // render TERMINATOR LINE
        instrumentElements.push(<div key="terminator" style={{
            position: 'absolute',
            left: CONST.TERMINATOR_OFFSET_X,
            top: 0,
            width: '1em',
            backgroundColor: CONST.TERMINATOR_COLOR,
            borderRadius: '1em',
            opacity: 0.8,
            height: CONST.GROUP_HEIGHT * props.melody.instruments.length
        }}>&nbsp;</div>)

        // render each instrument
        props.melody.instruments.forEach((instrument, i) => {
            // add instrument name
            instrumentElements.push(<div key={'instrument_lbl_' + instrument} style={{
                position: 'absolute',
                left: CONST.INSTRUMENTS_TEXT_OFFSET_X,
                top: + i * CONST.GROUP_HEIGHT + 6,
                fontSize: '1em',
                color: CONST.COLOR_TEXT
            }}>{instrument}</div>)

            // add instrument rail
            instrumentElements.push(<div key={'rail_' + instrument} style={{
                position: 'absolute',
                left: CONST.LINE_OFFSET_X,
                top: i * CONST.GROUP_HEIGHT + CONST.BEAT_RADIUS,
                width: 2000,
                backgroundColor: CONST.COLOR_LINE,
                height: 1
            }}>&nbsp;</div>)
        })

        return instrumentElements
    }

    function render() {
        return (<div style={gameContainerStyle} className='game-container'>
            <div style={melodyContainerStyle} className='melody-container'>{renderMelody()}</div>
            <div style={{
                position: 'absolute',
                left: 0, top: OFFSET_Y(),
                width: CONST.LINE_OFFSET_X,
                height: CONST.GROUP_HEIGHT * (props.melody.instruments.length + 2),
                backgroundColor: CONST.COLOR_BACKGROUND,
            }} className='instruments-container'>{renderInstruments()}</div>
        </div>)
    }

    return render()
}

export default DOMKOnnakolGame