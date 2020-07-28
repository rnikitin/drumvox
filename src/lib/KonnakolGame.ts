import { KonnakolMelody, MelodyBeat } from './DataModels'
import * as CONST from './KonnakolGameConstants'
import { createAnimation } from '@ionic/react'
import { Animation } from '@ionic/core'
import KonnakolAdminPage from '../pages/KonnakolAdminPage'
import { AppContext, PlayerState } from '../AppContext'

export class KonnakolGame {
    private melody: KonnakolMelody

    private BPM = 60

    offsetAnimation: Animation
    loopAnimation: Animation
    private offsetAnimationFinished = false

    constructor(melody: KonnakolMelody, bpm: number) {
        this.melody = melody
        this.BPM = bpm

        const domMelodyContainer = document.querySelector('.melody-container')

        this.offsetAnimation = this.offsetAnimation = createAnimation()
            .addElement(domMelodyContainer!)
            .iterations(1)
            .onFinish(() => {
                this.offsetAnimationFinished = true
            })

        this.loopAnimation = createAnimation()
            .addElement(domMelodyContainer!)
            .iterations(Infinity)

        this.recalculateAnimations()
    }

    private recalculateAnimations() {
        // расстояние которое проходит бит за t
        const S = CONST.BEAT_WIDTH
        // время, за которое проигрывается 1 бит
        const t = 60000 / (this.BPM * 4)
        // скорость, с которой движется бит по полотну
        const v = S / t

        const offset_s = CONST.BEAT_START_OFFSET_X + CONST.BEAT_WIDTH
        const offset_t = offset_s / v

        const loop_s = this.melody.beats.length * CONST.BEAT_WIDTH
        const loop_t = loop_s / v

        console.log(`KonnakolGame.recalculateAnimations v=${v} offset_t=${offset_t} offset_s=${offset_s} loop_t=${loop_t} loop_s=${loop_s} `)

        this.offsetAnimation
            .duration(offset_t)
            .fromTo('transform', 'translateX(0px)', `translateX(-${offset_s}px)`)

        this.loopAnimation
            .duration(loop_t)
            .fromTo('transform', `translateX(-${offset_s}px)`, `translateX(-${loop_s + offset_s}px)`)

    }

    public async play(delay = 0) {
        // set delay
        this.offsetAnimation.delay(delay)

        // start animation
        this.offsetAnimationFinished = false
        await this.offsetAnimation.play()
        await this.loopAnimation.play()
    }

    public pause() {
        if (!this.offsetAnimationFinished)
            this.offsetAnimation?.pause()
        else this.loopAnimation?.pause()
    }

    public resume() {
        if (!this.offsetAnimationFinished)
            this.offsetAnimation?.play()
        else this.loopAnimation?.play()
    }

    public changeBPM(newBPM: number) {
        this.BPM = newBPM
        this.recalculateAnimations()

        if (AppContext.Player.state == PlayerState.Playing) {
            this.stop()
            this.play(0)
        }
    }

    public stop() {
        this.offsetAnimation?.stop()
        this.loopAnimation?.stop()
    }

    public destroy() {
        this.stop()
        this.offsetAnimation?.destroy()
        this.loopAnimation?.destroy()
    }
}