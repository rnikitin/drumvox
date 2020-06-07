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
const TERMINATOR_OFFSET_X = 100
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
const TERMINATOR_COLOR = "#FF0000"
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
const COLOR_BEAT = "#F2F2F2"
/**
 * Сколько нот рендерить вперед
 */
const COUNT_BEATS_TO_RENDER_AHEAD = 32

export class KonnakolGame {
    private stage: Stage
    private melody: KonnakolMelody
    private instrumentsLayer = new Konva.Layer()
    private melodyLayer = new Konva.Layer()
    private lastRenderedBeat: MelodyBeat = { id: "-1", notes: [], konnakol: "" }
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
        this.renderInstruments()
        this.renderMelody()
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
        this.melodyLayer.moveToBottom()
        this.instrumentsLayer.moveToTop()
    }

    private renderInstruments() {
        // render TERMINATOR overflow
        var terminatorRect = new Konva.Rect({
            x: 0,
            y: OFFSET_Y,
            width: TERMINATOR_OFFSET_X,
            height: this.GAME_HEIGHT + 10,
            fill: COLOR_BACKGROUND
        })

        this.instrumentsLayer.add(terminatorRect)

        // render TERMINATOR LINE
        var terminatorLine = new Konva.Line({
            points: [
                TERMINATOR_OFFSET_X,
                OFFSET_Y,
                TERMINATOR_OFFSET_X,
                OFFSET_Y + this.GAME_HEIGHT
            ],
            stroke: TERMINATOR_COLOR,
            strokeWidth: 2,
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

            const lineY = OFFSET_Y + i * GROUP_HEIGHT + GROUP_HEIGHT / 2

            const line = new Konva.Line({
                points: [
                    LINE_OFFSET_X,
                    lineY,
                    1000,
                    lineY
                ],
                stroke: COLOR_LINE,
                strokeWidth: 1
            })

            group.add(text)
            group.add(line)
            this.instrumentsLayer.add(group)
        })

        // now show layer
        this.stage.add(this.instrumentsLayer)

        this.updateLayerZIndexes()
    }

    private renderMelody() {
        // clean up melody layer
        this.melodyLayer
            .destroyChildren()
            .clear()

        // render first chunk of melody notes
        for (var i = 0; i < COUNT_BEATS_TO_RENDER_AHEAD; i++) {
            // вычисляем следующий Beat
            var n = i % this.melody.beats.length
            var beat = this.melody.beats[n]

            this.lastRenderedBeat = beat

            let groupLayer = this.renderBeatGroup(beat, n, (BEAT_START_OFFSET_X + i * BEAT_WIDTH))

            // render group
            this.melodyLayer.add(groupLayer)
        }

        // finnally add to stage
        this.stage.add(this.melodyLayer)

        this.updateLayerZIndexes()
    }

    private renderBeatGroup(beat: MelodyBeat, beatIdx: number, offsetX: number): Konva.Group {

        // group layer
        const groupLayer = new Konva.Group({
            x: offsetX,
            y: OFFSET_Y,
            width: BEAT_WIDTH,
            height: (this.melody.instruments.length + 1),
            name: beat.id
        })

        // render melody start indicator
        if (beatIdx === 0) {
            var startIndicatorLine = new Konva.Line({
                points: [BEAT_RADIUS, 0, BEAT_RADIUS, this.melody.instruments.length * GROUP_HEIGHT],
                stroke: COLOR_BEAT,
                strokeWidth: 1
            })

            groupLayer.add(startIndicatorLine)
        }

        // render beats
        beat.notes.forEach(note => {

            // find instrument
            var instrumentIndex = this.melody.instruments.indexOf(note)

            // render note
            var circle = new Konva.Circle({
                x: BEAT_RADIUS,
                y: instrumentIndex * GROUP_HEIGHT + GROUP_HEIGHT / 2,
                radius: BEAT_RADIUS,
                fill: COLOR_BEAT
            })

            // render debug rect
            // var debugBox = new Konva.Rect({
            //     stroke: COLOR_BEAT,
            //     strokeWidth: 1,
            //     x: 0,
            //     y: instrumentIndex * GROUP_HEIGHT,
            //     width: BEAT_WIDTH,
            //     height: GROUP_HEIGHT
            // })

            groupLayer.add(circle)
            //groupLayer.add(debugBox)
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
        const notesRendered = this.melodyLayer.children.length

        // get last group with notes
        var lastGroup = this.melodyLayer.children[this.melodyLayer.children.length - 1]

        // find beats to render
        var idx = this.melody.beats.indexOf(this.lastRenderedBeat) + 1

        // restart melody if we approched the end
        if (idx === this.melody.beats.length)
            idx = 0

        // get next beats
        var nextBeats = this.melody.beats.slice(idx, idx + (COUNT_BEATS_TO_RENDER_AHEAD - notesRendered - 1))

        //console.log("renderMelodyAhead. notesRendered=", notesRendered, "idx=", idx, "nextBeats=", nextBeats)

        // render beats
        nextBeats.forEach((beat, n) => {

            let groupLayer = this.renderBeatGroup(beat, idx + n, lastGroup.x() + BEAT_WIDTH)

            // render group
            this.melodyLayer.add(groupLayer)

            this.lastRenderedBeat = beat
        })
    }

    private animationStep = (frame: IFrame | undefined) => {

        // расстояние которое проходит бит за t
        var S = BEAT_WIDTH
        // время, за которое проигрывается 1 бит
        var t = 60 / (this.BPM * 4)
        // скорость, с которой движется бит по полотну
        var v = S / t

        // время с прошлого прыжка
        var tdiff = frame!.timeDiff / 1000
        var Sdiff = v * tdiff

        //console.log(`S=${S} t=${t} v=${v} tdiff=${tdiff} Sdiff=${Sdiff} fps=${frame?.frameRate}`)

        // move all beats left
        this.melodyLayer.children.each(child => {
            // calculate new X coordinate
            var newX = child.x() - Sdiff

            // remove node, if it goes off screen
            if (newX < 0) {
                child.remove()

                // render melody ahead
                setTimeout(() => this.renderMelodyAhead())
            }
            else {
                // set new position to group
                child.x(newX)
            }
        })
    }
}