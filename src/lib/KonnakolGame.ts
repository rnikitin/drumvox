//import Konva from "konva"
//import { Stage } from "konva/types/Stage"
//import { IFrame } from "konva/types/types"
import { KonnakolMelody, MelodyBeat } from './DataModels'
import * as PIXI from 'pixi.js'
import { app } from 'firebase'
import { group } from 'console'

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
//const OFFSET_Y = 35
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
const TERMINATOR_COLOR = 0xF2F2F2
/**
 * Цвет текста
 */
const COLOR_TEXT = 0xE0E0E0
/**
 * Цвет линии
 */
const COLOR_LINE = 0xF2F2F2
/**
 *  Цвет фона
 */
const COLOR_BACKGROUND = 0x121212
/**
 * Цвет заглавного слога коннакола
 */
const COLOR_KONNAKOL_MAIN = '#EB5757'
/**
 * Цвет Бита
 */
const COLOR_BEAT_MAIN = 0xF2F2F2

/**
 * цвет второстепенного
 */
const COLOR_BEAT_SECONDARY = 0x828282
/**
 * Сколько нот рендерить вперед
 */
const COUNT_BEATS_TO_RENDER_AHEAD = 132

/**
 * Цвет лиии начала мелодии
 */
const COLOR_MELODY_START_LINE = '#EB5757'

/**
 * Вкл/выкл режима дебага канваса
 */
const CANVAS_DEBUG = false

export class KonnakolGame {
    private container: HTMLIonContentElement
    private melody: KonnakolMelody
    private instrumentsLayer = new PIXI.Graphics()
    //private melodyLayer = new Konva.Layer()
    //private beatRailsGroup = new Konva.Group()
    //private beatsGroup = new Konva.Group()
    private lastRenderedBeat: MelodyBeat = { notes: [], konnakol: '' }
    //private melodyAnimation: Konva.Animation
    private BPM = 60
    private app: PIXI.Application
    private beatsContainerCollection: PIXI.Container[] = []
    private started = false


    private get GAME_HEIGHT() { return GROUP_HEIGHT * (this.melody.instruments.length + 2) }
    private get OFFSET_Y() { return (this.container.clientHeight - this.GAME_HEIGHT) * 0.5 }

    constructor(container: HTMLIonContentElement, stageHeight: number, stageWidth: number, melody: KonnakolMelody, bpm: number) {
        this.container = container
        this.melody = melody
        this.BPM = bpm

        this.app = new PIXI.Application({
            width: stageWidth, height: stageHeight, backgroundColor: COLOR_BACKGROUND, resolution: 1//window.devicePixelRatio || 1,
        })

        container.appendChild(this.app.view)

        this.render()

        this.app.ticker.add(this.animationStep.bind(this))
        //this.app.ticker.minFPS = 60
        //this.app.ticker.deltaMS = 16.66
        //this.app.ticker.stop()
    }

    public play() {
        console.log('KonnakolGame.play')
        this.started = true
    }

    public pause() {
        this.app.ticker.stop()
        this.started = false
    }

    public changeBPM(newBPM: number) {
        this.BPM = newBPM
    }

    public stop() {
        this.app.ticker.stop()
        this.renderMelody()
        this.started = false
    }

    private render() {
        this.renderMelody()
        this.renderInstruments()
        this.updateLayerZIndexes()
    }

    public destroy() {
        this.stop()
        this.app.destroy()
    }

    private updateLayerZIndexes() {
        //this.instrumentsLayer.moveToTop()
        //this.melodyLayer.moveToBottom()
    }

    private renderInstruments() {
        // render TERMINATOR overflow

        // todo make terminator overlow under the text
        // this.instrumentsLayer
        //     .beginFill(COLOR_BACKGROUND)
        //     .drawRect(0, this.OFFSET_Y / 2, LINE_OFFSET_X, this.OFFSET_Y + this.GAME_HEIGHT + 10)
        //     .endFill()

        // render TERMINATOR LINE
        // todo round corners
        this.instrumentsLayer
            .lineStyle(10, TERMINATOR_COLOR)
            .moveTo(TERMINATOR_OFFSET_X, this.OFFSET_Y)
            .lineTo(TERMINATOR_OFFSET_X, this.OFFSET_Y + GROUP_HEIGHT * this.melody.instruments.length)
            .closePath()
            .endFill()

        // render each instrument canvas layer
        this.melody.instruments.forEach((instrument, i) => {

            const text = new PIXI.Text(instrument, {
                fontSize: 18,
                fill: COLOR_TEXT
            })
            text.x = INSTRUMENTS_TEXT_OFFSET_X
            text.y = this.OFFSET_Y + i * GROUP_HEIGHT + 4
            console.log(instrument, this.OFFSET_Y)

            this.app.stage.addChild(text)

            const lineY = this.OFFSET_Y + i * GROUP_HEIGHT + GROUP_HEIGHT / 2

            // render rails
            this.instrumentsLayer
                .lineStyle(1, COLOR_LINE, 1)
                .moveTo(LINE_OFFSET_X, lineY)
                .lineTo(1000, lineY)
                .closePath()
                .endFill()
        })

        // now show layer
        this.app.stage.addChild(this.instrumentsLayer)
    }

    private renderMelody() {

        // render first chunk of melody notes
        for (let i = 0; i < COUNT_BEATS_TO_RENDER_AHEAD; i++) {
            // вычисляем следующий Beat
            const n = i % this.melody.beats.length
            const beat = this.melody.beats[n]

            this.lastRenderedBeat = beat

            this.beatsContainerCollection.push(this.renderBeatGroup(beat, n, (BEAT_START_OFFSET_X + (i + 1) * BEAT_WIDTH)))
        }
    }

    private renderBeatGroup(beat: MelodyBeat, beatIdx: number, offsetX: number) {

        // beat container
        const groupContainer = new PIXI.Container()
        groupContainer.x = offsetX
        groupContainer.y = this.OFFSET_Y
        groupContainer.width = BEAT_WIDTH
        groupContainer.height = (this.melody.instruments.length + 1) * GROUP_HEIGHT

        // todo render melody start indicator
        // if (beatIdx === 0) {
        //     const startIndicatorLine = new Konva.Line({
        //         points: [BEAT_RADIUS, -5, BEAT_RADIUS, this.melody.instruments.length * GROUP_HEIGHT + 5],
        //         stroke: COLOR_MELODY_START_LINE,
        //         strokeWidth: 2
        //     })

        //     groupLayer.add(startIndicatorLine)
        // }

        // render beats
        beat.notes.forEach(note => {
            // find instrument
            const instrumentIndex = this.melody.instruments.indexOf(note)

            const circle = new PIXI.Graphics()
            circle
                .beginFill(beat.main ? COLOR_BEAT_MAIN : COLOR_BEAT_SECONDARY)
                .drawCircle(BEAT_RADIUS, instrumentIndex * GROUP_HEIGHT + GROUP_HEIGHT / 2, BEAT_RADIUS)
                .endFill()

            groupContainer.addChild(circle)

            // if (CANVAS_DEBUG) {
            //     // render debug rect
            //     const debugBox = new Konva.Rect({
            //         stroke: COLOR_BEAT_SECONDARY,
            //         strokeWidth: 1,
            //         x: 0,
            //         y: instrumentIndex * GROUP_HEIGHT,
            //         width: BEAT_WIDTH,
            //         height: GROUP_HEIGHT
            //     })
            //     groupLayer.add(debugBox)
            // }
        })

        this.app.stage.addChild(groupContainer)

        return groupContainer

        // render konnakol number
        // const konnakolNumber = new Konva.Text({
        //     x: BEAT_RADIUS - 8,
        //     y: this.melody.instruments.length * GROUP_HEIGHT + GROUP_HEIGHT / 2,
        //     fontSize: 18,
        //     fill: COLOR_TEXT,
        //     text: beat.num?.toString(),
        //     align: 'center'
        // })

        // // render konnakol
        // const konnakolText = new Konva.Text({
        //     x: BEAT_RADIUS - 12,
        //     y: (this.melody.instruments.length + 1) * GROUP_HEIGHT + GROUP_HEIGHT / 2,
        //     fontSize: 18,
        //     fill: beat.main ? COLOR_KONNAKOL_MAIN : COLOR_TEXT,
        //     text: beat.konnakol,
        //     align: 'center'
        // })

        // groupLayer.add(konnakolNumber)
        // groupLayer.add(konnakolText)

        //return groupLayer
    }

    private renderMelodyAhead() {
        const notesRendered = this.beatsContainerCollection.length

        // get last group with notes
        const lastGroup = this.beatsContainerCollection[notesRendered - 1]

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

            const groupLayer = this.renderBeatGroup(beat, idx + n, lastGroup.position.x + BEAT_WIDTH)

            // render group
            this.beatsContainerCollection.push(groupLayer)

            this.lastRenderedBeat = beat
        })
    }

    private animationStep = (delta: number) => {

        if (!this.started) {
            return false
        }

        // расстояние которое проходит бит за t
        const S = BEAT_WIDTH
        // время, за которое проигрывается 1 бит
        const t = 60 / (this.BPM * 4)
        // скорость, с которой движется бит по полотну
        const v = S / t

        // время с прошлого прыжка
        const tdiff = this.app.ticker.elapsedMS / 1000
        const Sdiff = v * tdiff

        console.log(`S=${S} t=${t} v=${v} tdiff=${tdiff} Sdiff=${Sdiff}`)

        this.beatsContainerCollection.forEach((beatContainer) => {
            beatContainer.position.x -= Sdiff
        })

        this.renderMelodyAhead()

        // for (const beatGroup of this.beatsGroup.children.toArray()) {
        //     // move group left
        //     const newX = beatGroup.x() - Sdiff
        //     beatGroup.x(newX)

        //     if (beatGroup.x() < 0) {
        //         //hide bit
        //         beatGroup.hide()

        //         // render layer
        //         this.melodyLayer.draw()

        //         // destroy layer
        //         setTimeout(() => beatGroup.destroy())

        //         // render ahead on every 5 beats
        //         if ((COUNT_BEATS_TO_RENDER_AHEAD - beatGroup.children.length) > 5)
        //             setTimeout(() => this.renderMelodyAhead())
        //     }
        // }
    }
}