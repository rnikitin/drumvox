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
let OFFSET_Y = 35
/**
 * Высота группы с инструментом
 */
const GROUP_HEIGHT = 32
/**
 * Ширина Beat
 */
const BEAT_WIDTH = 60
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
const COUNT_BEATS_TO_RENDER_AHEAD = 32

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

    function play() {
        const start_time = performance.now()
        let last_time = start_time
        const BPM = 60
        // расстояние которое проходит бит за t
        const S = BEAT_WIDTH

        const domMelodyContainer = document.querySelector('.melody-container') as HTMLElement
        let last_left = 0

        console.log('play ', domMelodyContainer, last_left, last_time)

        requestAnimationFrame(function loop(time) {
            // время с прошлого прыжка
            const time_diff = (time - start_time) / 1000
            // время, за которое проигрывается 1 бит
            const t = 60 / (BPM * 4)
            // скорость, с которой движется бит по полотну
            const v = S / t

            // размер нового прыжка
            const Sdiff = v * time_diff

            console.log(`S=${S} t=${t} v=${v} time=${time} tdiff=${time_diff} Sdiff=${Sdiff} fps=${1 / time_diff}`)

            last_left -= Sdiff
            // render animation
            domMelodyContainer.style.transform = `translate(${-time_diff * v}px)`

            last_time = time
            requestAnimationFrame(loop)
        })
    }

    function render() {
        return (<div style={gameContainerStyle} className='game-container'>
            <div style={melodyContainerStyle} className='melody-container'>{renderMelody()}</div>
            <div style={instrumentsContainerStyle} className='instruments-container'>{renderInstruments()}</div>
        </div>)
    }

    setTimeout(() => play(), 3000)

    return render()
}

export default DOMKOnnakolGame

class KonnakolGame {
    private stage: Stage
    private melody: KonnakolMelody
    private instrumentsLayer = new Konva.Layer()
    private melodyLayer = new Konva.Layer()
    private beatRailsGroup = new Konva.Group()
    private beatsGroup = new Konva.Group()
    private lastRenderedBeat: MelodyBeat = { notes: [], konnakol: '' }
    private melodyAnimation: Konva.Animation
    private BPM = 60


    private get GAME_HEIGHT() { return GROUP_HEIGHT * (this.melody.instruments.length + 2) }

    constructor(stage: Stage, stageHeight: number, stageWidth: number, melody: KonnakolMelody, bpm: number) {
        this.stage = stage
        this.melody = melody
        this.BPM = bpm

        this.stage.width(stageWidth)
        this.stage.height(stageHeight)

        this.render()

        this.melodyAnimation = new Konva.Animation(this.animationStep.bind(this), this.melodyLayer)

    }

    public play() {
        console.log('KonnakolGame.play')
        this.melodyAnimation.start()
    }

    public pause() {
        this.melodyAnimation.stop()
    }

    public changeBPM(newBPM: number) {
        this.BPM = newBPM
    }

    public stop() {
        this.melodyAnimation.stop()
        this.renderMelody()
    }

    private render() {
        this.calculateRulers()
        this.renderMelody()
        this.renderInstruments()
        this.updateLayerZIndexes()
    }

    public destroy() {
        this.stop()
        this.stage.removeChildren()
    }

    /**
     * calculate offsets and sizes depends on stage size
     */
    private calculateRulers() {
        OFFSET_Y = (this.stage.height() - this.GAME_HEIGHT) * 0.5

        console.log(`calculated ${OFFSET_Y}=(${this.stage.height()}-${this.GAME_HEIGHT}) * 0.6`)
    }

    private updateLayerZIndexes() {
        this.instrumentsLayer.moveToTop()
        this.melodyLayer.moveToBottom()
    }

    private renderInstruments() {
        // render TERMINATOR overflow
        const terminatorRect = new Konva.Rect({
            x: 0,
            y: OFFSET_Y / 2,
            width: LINE_OFFSET_X,
            height: OFFSET_Y + this.GAME_HEIGHT + 10,
            fill: COLOR_BACKGROUND
        })

        this.instrumentsLayer.add(terminatorRect)

        // render TERMINATOR LINE
        const terminatorLine = new Konva.Line({
            points: [
                TERMINATOR_OFFSET_X,
                OFFSET_Y,
                TERMINATOR_OFFSET_X,
                OFFSET_Y + GROUP_HEIGHT * this.melody.instruments.length
            ],
            stroke: TERMINATOR_COLOR,
            strokeWidth: 10,
            //opacity: 0.7,
            lineCap: 'round',
            lineJoin: 'round'
        })
        this.instrumentsLayer.add(terminatorLine)

        // render each instrument canvas layer
        this.melody.instruments.forEach((instrument, i) => {
            const group = new Konva.Group()
            const text = new Konva.Text({
                x: INSTRUMENTS_TEXT_OFFSET_X,
                y: OFFSET_Y + i * GROUP_HEIGHT + 6,
                fontSize: 18,
                fill: COLOR_TEXT,
                text: instrument
            })

            this.instrumentsLayer.add(text)
        })

        // now show layer
        this.stage.add(this.instrumentsLayer)
    }

    private renderMelody() {
        // clean up melody layer
        this.beatsGroup.destroy()
        this.beatsGroup = new Konva.Group()

        this.beatsGroup.transformsEnabled('position')

        this.melody.instruments.forEach((_instrument, i) => {
            const lineY = OFFSET_Y + i * GROUP_HEIGHT + GROUP_HEIGHT / 2

            const rail = new Konva.Line({
                points: [
                    LINE_OFFSET_X,
                    lineY,
                    1000,
                    lineY
                ],
                stroke: COLOR_LINE,
                strokeWidth: 1
            })

            this.beatRailsGroup.add(rail)
        })

        // render first chunk of melody notes
        for (let i = 0; i < COUNT_BEATS_TO_RENDER_AHEAD; i++) {
            // вычисляем следующий Beat
            const n = i % this.melody.beats.length
            const beat = this.melody.beats[n]

            this.lastRenderedBeat = beat

            const groupLayer = this.renderBeatGroup(beat, n, (BEAT_START_OFFSET_X + (i + 1) * BEAT_WIDTH))

            // render group
            this.beatsGroup.add(groupLayer)
        }

        // finnally add to stage
        this.melodyLayer.add(this.beatRailsGroup)
        this.melodyLayer.add(this.beatsGroup)
        this.stage.add(this.melodyLayer)

        this.updateLayerZIndexes()
    }

    private renderBeatGroup(beat: MelodyBeat, beatIdx: number, offsetX: number): Konva.Group {

        // group layer
        const groupLayer = new Konva.Group({
            x: offsetX,
            y: OFFSET_Y,
            width: BEAT_WIDTH,
            height: (this.melody.instruments.length + 1)
        })

        // render melody start indicator
        if (beatIdx === 0) {
            const startIndicatorLine = new Konva.Line({
                points: [BEAT_RADIUS, -5, BEAT_RADIUS, this.melody.instruments.length * GROUP_HEIGHT + 5],
                stroke: COLOR_MELODY_START_LINE,
                strokeWidth: 2
            })

            groupLayer.add(startIndicatorLine)
        }

        // render beats
        beat.notes.forEach(note => {

            // find instrument
            const instrumentIndex = this.melody.instruments.indexOf(note)

            // render note
            const circle = new Konva.Circle({
                x: BEAT_RADIUS,
                y: instrumentIndex * GROUP_HEIGHT + GROUP_HEIGHT / 2,
                radius: BEAT_RADIUS,
                fill: beat.main ? COLOR_BEAT_MAIN : COLOR_BEAT_SECONDARY
            })
            groupLayer.add(circle)

            if (CANVAS_DEBUG) {
                // render debug rect
                const debugBox = new Konva.Rect({
                    stroke: COLOR_BEAT_SECONDARY,
                    strokeWidth: 1,
                    x: 0,
                    y: instrumentIndex * GROUP_HEIGHT,
                    width: BEAT_WIDTH,
                    height: GROUP_HEIGHT
                })
                groupLayer.add(debugBox)
            }
        })

        // render konnakol number
        const konnakolNumber = new Konva.Text({
            x: BEAT_RADIUS - 8,
            y: this.melody.instruments.length * GROUP_HEIGHT + GROUP_HEIGHT / 2,
            fontSize: 18,
            fill: COLOR_TEXT,
            text: beat.num?.toString(),
            align: 'center'
        })

        // render konnakol
        const konnakolText = new Konva.Text({
            x: BEAT_RADIUS - 12,
            y: (this.melody.instruments.length + 1) * GROUP_HEIGHT + GROUP_HEIGHT / 2,
            fontSize: 18,
            fill: beat.main ? COLOR_KONNAKOL_MAIN : COLOR_TEXT,
            text: beat.konnakol,
            align: 'center'
        })

        groupLayer.add(konnakolNumber)
        groupLayer.add(konnakolText)

        return groupLayer
    }

    private renderMelodyAhead() {
        const notesRendered = this.beatsGroup.children.length

        // get last group with notes
        const lastGroup = this.beatsGroup.children[notesRendered - 1]

        // find beats to render
        let idx = this.melody.beats.indexOf(this.lastRenderedBeat) + 1

        // restart melody if we approched the end
        if (idx === this.melody.beats.length)
            idx = 0

        // get next beats
        const nextBeats = this.melody.beats.slice(idx, idx + (COUNT_BEATS_TO_RENDER_AHEAD - notesRendered - 1))

        //console.log("renderMelodyAhead. notesRendered=", notesRendered, "idx=", idx, "nextBeats=", nextBeats)

        // render beats
        nextBeats.forEach((beat, n) => {

            const groupLayer = this.renderBeatGroup(beat, idx + n, lastGroup.x() + BEAT_WIDTH)

            // render group
            this.beatsGroup.add(groupLayer)

            this.lastRenderedBeat = beat
        })
    }

    private animationStep = (frame: IFrame | undefined) => {

        // расстояние которое проходит бит за t
        const S = BEAT_WIDTH
        // время, за которое проигрывается 1 бит
        const t = 60 / (this.BPM * 4)
        // скорость, с которой движется бит по полотну
        const v = S / t

        // время с прошлого прыжка
        const tdiff = frame!.timeDiff / 1000
        const Sdiff = v * tdiff

        //console.log(`S=${S} t=${t} v=${v} tdiff=${tdiff} Sdiff=${Sdiff} fps=${frame?.frameRate}`)

        for (const beatGroup of this.beatsGroup.children.toArray()) {
            // move group left
            const newX = beatGroup.x() - Sdiff
            beatGroup.x(newX)

            if (beatGroup.x() < 0) {
                // destroy this beat
                beatGroup.destroy()
                setTimeout(() => beatGroup.destroy())

                // render ahead on every 5 beats
                if ((COUNT_BEATS_TO_RENDER_AHEAD - beatGroup.children.length) > 5)
                    setTimeout(() => this.renderMelodyAhead())
            }
        }
    }
}