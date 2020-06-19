import Konva from "konva"
import { Stage } from "konva/types/Stage"
import { IFrame } from "konva/types/types"
import { KonnakolMelody, MelodyBeat } from "./DataModels"

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
const TERMINATOR_COLOR = "#F2F2F2"
/**
 * Цвет текста
 */
const COLOR_TEXT = "#E0E0E0"
/**
 * Цвет линии
 */
const COLOR_LINE = "#F2F2F2"
/**
 *  Цвет фона
 */
const COLOR_BACKGROUND = "#121212"
/**
 * Цвет заглавного слога коннакола
 */
const COLOR_KONNAKOL_MAIN = "#EB5757"
/**
 * Цвет Бита
 */
const COLOR_BEAT_MAIN = "#F2F2F2"

/**
 * цвет второстепенного
 */
const COLOR_BEAT_SECONDARY = "#828282"
/**
 * Сколько нот рендерить вперед
 */
const COUNT_BEATS_TO_RENDER_AHEAD = 32

/**
 * Цвет лиии начала мелодии
 */
const COLOR_MELODY_START_LINE = "#EB5757"

/**
 * Вкл/выкл режима дебага канваса
 */
const CANVAS_DEBUG = false

export class KonnakolGame {
    private stage: Stage
    private melody: KonnakolMelody
    private instrumentsLayer = new Konva.Layer()
    private melodyLayer = new Konva.Layer()
    private beatRailsGroup = new Konva.Group()
    private beatsGroup = new Konva.Group()
    private lastRenderedBeat: MelodyBeat = { notes: [], konnakol: "" }
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
        console.log("KonnakolGame.play")
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
            lineCap: "round",
            lineJoin: "round"
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

        this.beatsGroup.transformsEnabled("position")

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
            align: "center"
        })

        // render konnakol
        const konnakolText = new Konva.Text({
            x: BEAT_RADIUS - 12,
            y: (this.melody.instruments.length + 1) * GROUP_HEIGHT + GROUP_HEIGHT / 2,
            fontSize: 18,
            fill: beat.main ? COLOR_KONNAKOL_MAIN : COLOR_TEXT,
            text: beat.konnakol,
            align: "center"
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