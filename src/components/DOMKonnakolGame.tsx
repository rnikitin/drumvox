import { KonnakolMelody, MelodyBeat } from '../lib/DataModels'
import React, { DOMElement } from 'react'
import { Stage } from 'konva/types/Stage'
import Konva from 'konva'
import { IFrame } from 'konva/types/types'

import './DOMKonnakolGame.css'

/**
 * Отступ от края экрана для текста Инструментов
 */
const INSTRUMENTS_TEXT_OFFSET_X = 20
/**
 * Отступ от края экрана для линии по которой едут точки Инструмента
 */
const LINE_OFFSET_X = 80
/**
 * Базовый отступ от верхнего края Stage
 */
const BASE_OFFSET_Y = 35
/**
 * Высота группы с инструментом
 */
const GROUP_HEIGHT = 32
/**
 * Ширина Beat
 */
const BEAT_WIDTH = 40
/**
 * Отсутп справа для Терминатора
 */
const TERMINATOR_OFFSET_X = 250
/**
 * Radius of the beat dot
 */
const BEAT_RADIUS = 12
/**
 * offset from left corner for the beat
 */
const BEAT_START_OFFSET_X = TERMINATOR_OFFSET_X
/**
 * Цвет Терминатора
 */
const TERMINATOR_COLOR = '#F2F2F2'
/**
 * Цвет текста
 */
const COLOR_TEXT = '#E0E0E0'
/**
 * Цвет линии
 */
const COLOR_LINE = '#F2F2F2'
/**
 *  Цвет фона
 */
const COLOR_BACKGROUND = '#121212'
/**
 * Цвет заглавного слога коннакола
 */
const COLOR_KONNAKOL_MAIN = '#EB5757'
/**
 * Цвет Бита
 */
const COLOR_BEAT_MAIN = '#F2F2F2'

/**
 * цвет второстепенного
 */
const COLOR_BEAT_SECONDARY = '#828282'
/**
 * Сколько нот рендерить вперед
 */
const COUNT_BEATS_TO_RENDER_AHEAD = 30

/**
 * Цвет лиии начала мелодии
 */
const COLOR_MELODY_START_LINE = '#EB5757'

/**
 * Вкл/выкл режима дебага канваса
 */
const CANVAS_DEBUG = false

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

const instrumentsContainerStyle: React.CSSProperties = {

}

const DOMKOnnakolGame: React.FC<DOMKOnnakolGameProps> = (props: DOMKOnnakolGameProps) => {

    console.log('DOMKOnnakolGame', props)

    const GAME_HEIGHT = () => GROUP_HEIGHT * (props?.melody?.instruments.length! + 2)
    const OFFSET_Y = () => (props?.container.current?.clientHeight! - GAME_HEIGHT()) * 0.5

    let lastRenderedBeat: MelodyBeat | null = null

    function renderMelody() {
        const melodyElements: JSX.Element[] = []

        // render first chunk of melody notes
        for (let i = 0; i < COUNT_BEATS_TO_RENDER_AHEAD; i++) {
            // вычисляем следующий Beat
            const n = i % props.melody.beats.length
            const beat = props.melody.beats[n]

            lastRenderedBeat = beat

            melodyElements.push(renderBeatGroup(beat, n, (BEAT_START_OFFSET_X + (i + 1) * BEAT_WIDTH)))
        }

        return melodyElements
    }

    function renderBeatGroup(beat: MelodyBeat, beatIdx: number, offsetX: number) {
        // render melody start indicator
        if (beatIdx === 0) {
            const beginIndicatorElement = <div style={{
                position: 'absolute',
                left: BEAT_RADIUS,
                top: -5,
                height: props.melody.instruments.length * GROUP_HEIGHT + 5,
                width: 2,
                backgroundColor: COLOR_MELODY_START_LINE,
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
                top: instrumentIndex * GROUP_HEIGHT,
                width: 2 * BEAT_RADIUS,
                height: 2 * BEAT_RADIUS,
                borderRadius: '50%',
                backgroundColor: beat.main ? COLOR_BEAT_MAIN : COLOR_BEAT_SECONDARY

            }}>&nbsp;</div>)
        })

        // render konnakol number
        const konnakolNumberElement = <div style={{
            position: 'absolute',
            left: BEAT_RADIUS - 6,
            bottom: GROUP_HEIGHT,
            fontSize: '1em',
            color: COLOR_TEXT,
            textAlign: 'center'

        }}>{beat.num}</div>

        // render konnakol
        const konnakolTextElement = <div style={{
            position: 'absolute',
            left: BEAT_RADIUS - 8,
            bottom: 0,
            fontSize: '1em',
            color: COLOR_TEXT,
            textAlign: 'center'
        }}>{beat.konnakol}</div>

        return <div className="beat-group" key={'beat' + offsetX} style={{
            position: 'absolute',
            left: offsetX,
            top: OFFSET_Y(),
            width: BEAT_WIDTH,
            height: (props.melody.instruments.length + 2) * GROUP_HEIGHT,
            //border: '1px solid red',
        }}>{beatNotesElements}
            {konnakolNumberElement}
            {konnakolTextElement}</div>
    }

    function renderInstruments() {
        const instrumentElements: JSX.Element[] = []

        // render TERMINATOR LINE
        instrumentElements.push(<div key="terminator" style={{
            position: 'absolute',
            left: TERMINATOR_OFFSET_X,
            top: OFFSET_Y(),
            width: '1em',
            backgroundColor: TERMINATOR_COLOR,
            borderRadius: '1em',
            opacity: 0.8,
            height: GROUP_HEIGHT * props.melody.instruments.length + 'px'
        }}>&nbsp;</div>)

        // render each instrument
        props.melody.instruments.forEach((instrument, i) => {
            // add instrument name
            instrumentElements.push(<div key={'instrument_lbl_' + instrument} style={{
                position: 'absolute',
                left: INSTRUMENTS_TEXT_OFFSET_X,
                top: (OFFSET_Y() + i * GROUP_HEIGHT + 6),
                fontSize: '1em',
                color: COLOR_TEXT
            }}>{instrument}</div>)

            // add instrument rail
            instrumentElements.push(<div key={'rail_' + instrument} style={{
                position: 'absolute',
                left: LINE_OFFSET_X,
                top: OFFSET_Y() + i * GROUP_HEIGHT + BEAT_RADIUS,
                width: 2000,
                backgroundColor: COLOR_LINE,
                height: 1
            }}>&nbsp;</div>)
        })

        return instrumentElements
    }

    function render() {
        return (<div style={gameContainerStyle} className='game-container'>
            <div style={melodyContainerStyle} className='melody-container'>{renderMelody()}</div>
            <div style={instrumentsContainerStyle} className='instruments-container'>{renderInstruments()}</div>
        </div>)
    }

    return render()
}

export default DOMKOnnakolGame