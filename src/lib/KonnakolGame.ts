import { KonnakolMelody, MelodyBeat } from './DataModels'

/**
 * Отступ от края экрана для текста Инструментов
 */
const INSTRUMENTS_TEXT_OFFSET_X = 20
/**
 * Отступ от края экрана для линии по которой едут точки Инструмента
 */
const LINE_OFFSET_X = 80
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
const COUNT_BEATS_TO_RENDER_AHEAD = 32

/**
 * Цвет лиии начала мелодии
 */
const COLOR_MELODY_START_LINE = '#EB5757'

/**
 * Вкл/выкл режима дебага канваса
 */
const CANVAS_DEBUG = false

export class KonnakolGame {
    private melody: KonnakolMelody

    private lastRenderedBeat: MelodyBeat = { notes: [], konnakol: '' }
    private BPM = 60

    animation?: Animation

    private get GAME_HEIGHT() { return GROUP_HEIGHT * (this.melody.instruments.length + 2) }

    constructor(melody: KonnakolMelody, bpm: number) {

        this.melody = melody
        this.BPM = bpm
    }

    public play(delay = 0) {
        const start_time = performance.now()
        //let last_time = start_time
        const BPM = 60
        // расстояние которое проходит бит за t
        const S = BEAT_WIDTH
        // время, за которое проигрывается 1 бит
        const t = 60 / (BPM * 4)
        // скорость, с которой движется бит по полотну
        const v = S / t

        console.log(`play S=${BEAT_WIDTH} v=${v} t=${t}`)

        const melody_width = COUNT_BEATS_TO_RENDER_AHEAD * BEAT_WIDTH
        const melody_t = melody_width/v

        const domMelodyContainer = document.querySelector('.melody-container')
        //let last_left = 0

        console.log(`play v=${v} w=${melody_width} t=${melody_t}`)

        this.animation = domMelodyContainer?.animate(
            [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-' + melody_width + 'px)' }
            ],
            {
                duration: melody_t * 1000,
                iterations: Infinity,
                delay: delay
            })

        // const theLoop = requestAnimationFrame(function loop(time) {
        //     // время с прошлого прыжка
        //     const time_diff = (time - start_time) / 1000

        //     // размер нового прыжка
        //     const Sdiff = v * time_diff

        //     //console.log(`S=${S} t=${t} v=${v} time=${time} tdiff=${time_diff} Sdiff=${Sdiff} fps=${1 / time_diff}`)

        //     last_left -= Sdiff
        //     // render animation
        //     //domMelodyContainer.style.transform = `translate(${-time_diff * v}px)`

        //     last_time = time
        //     requestAnimationFrame(loop)
        // })
    }

    public pause() {
        //this.melodyAnimation.stop()
        this.animation?.pause()
    }

    public resume(){
        this.animation?.play()
    }

    public changeBPM(newBPM: number) {
        this.BPM = newBPM
    }

    public stop() {
        //this.melodyAnimation.stop()
        this.animation?.cancel()
    }

    public destroy() {
        this.stop()
    }
}