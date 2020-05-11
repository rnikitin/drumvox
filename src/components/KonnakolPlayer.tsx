import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';
import { bus, KonnakolPlayerPlayEvent } from '../lib/events';

type KonnakolPlayerProps = {
    contentRef: React.RefObject<HTMLIonContentElement>;
};

type MelodyBeat = {
    id: string;
    notes: string[];
    konnakol: string;
    main?: boolean;
};

const instruments = ["Crash", "HH", "Snare", "Kick"];
const melody: MelodyBeat[] = [
    { id: "1", notes: ["Crash", "Kick"], konnakol: "Ta", main: true },
    { id: "2", notes: ["HH"], konnakol: "Ka" },
    { id: "3", notes: ["HH"], konnakol: "Di" },
    { id: "4", notes: ["HH"], konnakol: "Mi" },
    { id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
    { id: "6", notes: ["HH"], konnakol: "Ki" },
    { id: "7", notes: ["HH"], konnakol: "Ta" },
    { id: "8", notes: ["HH", "Kick"], konnakol: "Ta", main: true },
    { id: "9", notes: ["HH"], konnakol: "Ki" },
    { id: "10", notes: ["HH"], konnakol: "Ta" },
    { id: "11", notes: ["HH", "Kick"], konnakol: "Ta", main: true },
    { id: "12", notes: ["HH"], konnakol: "Ka" },
    { id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
    { id: "14", notes: ["HH", "Kick"], konnakol: "Ta", main: true },
    { id: "15", notes: ["HH"], konnakol: "Ki" },
    { id: "16", notes: ["HH"], konnakol: "Ta" }
];

const KonnakolPlayer: React.FC<KonnakolPlayerProps> = (props) => {

    const stageRef = useRef<Stage>(null);
    let contentRect: DOMRect | undefined;
    let lastRenderedBeat: MelodyBeat;

    const groupHeight = 32;
    const beatXSize = 40;
    const XTerminatorOffset = 100;
    const YOffset = 60;
    const textColor = "#E0E0E0";
    const lineColor = "#F2F2F2";
    const backgroundColor = "#121212";

    const melodyPrerenderSize = 32;

    const instrumentsLayer = new Konva.Layer();
    const melodyLayer = new Konva.Layer();

    /// ANIMATIONS
    var melodyAnimation = new Konva.Animation((frame) => {

        melodyLayer.children.each(child => {
            var newX = child.x() - 1;
            // remove hidden child
            if (newX < 0) {
                child.remove();

                // render melody again
                setTimeout(() => {
                    renderMelodyAhead();
                })

            }
            else {
                child.x(newX);
            }
        })

        //console.log('melodyAnimation', frame, melodyLayer.children.length);

        // TODO clean invisible notes
        // TODO render notes ahead

    }, melodyLayer);



    // On Component Mount
    useEffect(() => {

        // EVENTS
        const konnakolPlayerPlayEventUnsubscribe = bus.subscribe(KonnakolPlayerPlayEvent, e => {
            console.log("KonnakolPlayer.KonnakolPlayerPlayEvent", e);

            if (e.payload.playing) {
                melodyAnimation.start();
            }
            else {
                melodyAnimation.stop();
            }
        });

        // dirty hack goes here
        setTimeout(() => {
            contentRect = props.contentRef.current?.getBoundingClientRect();
            console.log("KonnakolPlayer Mount and Ready", contentRect);

            // render canvas stage
            renderStage();
            renderInstruments();
            renderMelody();

            melodyLayer.moveToBottom();
            instrumentsLayer.moveToTop();

        }, 1000);

        // unmount function
        return () => {
            konnakolPlayerPlayEventUnsubscribe();
        }
    }, []);

    const renderStage = () => {
        const stage = stageRef?.current?.getStage();

        stage?.width(contentRect?.width || 0);
        stage?.height(contentRect?.height || 0);
    };

    const renderInstruments = () => {
        const stage = stageRef?.current?.getStage();

        const XTextOffset = 20;
        const XLineOffset = 80;


        // render TERMINATOR overflow
        var terminatorRect = new Konva.Rect({
            x: 0,
            y: YOffset,
            width: XTerminatorOffset,
            height: (groupHeight * (instruments.length + 1)),
            fill: backgroundColor
        });
        instrumentsLayer.add(terminatorRect);

        // render TERMINATOR LINE
        var terminatorLine = new Konva.Line({
            points: [
                XTerminatorOffset,
                YOffset,
                XTerminatorOffset,
                YOffset + (groupHeight * (instruments.length + 1))
            ],
            stroke: "#BDBDBD",
            strokeWidth: 14,
            lineCap: 'round',
            lineJoin: 'round'
        });
        instrumentsLayer.add(terminatorLine);



        // render each instrument canvas layer
        instruments.forEach((instrument, i) => {
            const group = new Konva.Group();
            const text = new Konva.Text({
                x: XTextOffset,
                y: YOffset + i * groupHeight + 6,
                fontSize: 18,
                fill: textColor,
                text: instrument
            });

            const lineY = YOffset + i * groupHeight + groupHeight / 2;

            const line = new Konva.Line({
                points: [
                    XLineOffset,
                    lineY,
                    1000,
                    lineY
                ],
                stroke: lineColor,
                strokeWidth: 1
            });

            group.add(text);
            group.add(line);
            instrumentsLayer.add(group);
        });

        // now show layer
        stage?.add(instrumentsLayer);
    };

    const renderMelody = () => {
        const stage = stageRef?.current?.getStage();

        melodyLayer
            .destroyChildren()
            .clear();



        // render first 32 melody notes
        for (var i = 0; i < melodyPrerenderSize; i++) {
            var n = i % melody.length;
            var beat = melody[n];

            lastRenderedBeat = beat;

            const groupLayer = new Konva.Group({
                x: XTerminatorOffset + i * beatXSize,
                y: YOffset,
                width: beatXSize,
                height: (instruments.length + 1),
                name: beat.id
            });

            // render beats
            beat.notes.forEach(note => {

                // find instrument
                var instrumentIndex = instruments.indexOf(note);

                // render note
                var circle = new Konva.Circle({
                    x: beatXSize,
                    y: instrumentIndex * groupHeight + groupHeight / 2,
                    radius: 12,
                    fill: '#F2F2F2'
                });

                groupLayer.add(circle);
            });

            // render konnakol
            const konnakolText = new Konva.Text({
                x: beatXSize - 8,
                y: instruments.length * groupHeight + groupHeight / 2,
                fontSize: 18,
                fill: beat.main ? "#EB5757" : textColor,
                text: beat.konnakol,
                align: 'center'
            });

            groupLayer.add(konnakolText);

            // render group
            melodyLayer.add(groupLayer);
        }

        // finnally add to stage
        stage?.add(melodyLayer);
    };

    const renderMelodyAhead = () => {
        const notesRendered = melodyLayer.children.length;

        // get last group with notes
        var lastGroup = melodyLayer.children[melodyLayer.children.length - 1];

        // find beats to render
        var idx = melody.indexOf(lastRenderedBeat);
        // restart melody if we approched the end
        if ((idx + 1) == melody.length)
            idx = -1;
        // get next beats
        var nextBeats = melody.slice(idx + 1, idx + (melodyPrerenderSize - notesRendered));
        console.log('renderMelodyAhead. notesRendered=', notesRendered, 'idx=', idx, 'nextBeats=', nextBeats);

        // render beats
        nextBeats.forEach(beat => {

            const groupLayer = new Konva.Group({
                x: lastGroup.x() + beatXSize,
                y: YOffset,
                width: beatXSize,
                height: (instruments.length + 1),
                name: beat.id
            });

            // render beats
            beat.notes.forEach(note => {

                // find instrument
                var instrumentIndex = instruments.indexOf(note);

                // render note
                var circle = new Konva.Circle({
                    x: beatXSize,
                    y: instrumentIndex * groupHeight + groupHeight / 2,
                    radius: 12,
                    fill: '#F2F2F2'
                });

                groupLayer.add(circle);
            });

            // render konnakol
            const konnakolText = new Konva.Text({
                x: beatXSize - 8,
                y: instruments.length * groupHeight + groupHeight / 2,
                fontSize: 18,
                fill: beat.main ? "#EB5757" : textColor,
                text: beat.konnakol,
                align: 'center'
            });

            groupLayer.add(konnakolText);

            // render group
            melodyLayer.add(groupLayer);

            lastRenderedBeat = beat;

        });


    }

    return (
        <Stage ref={stageRef}>
        </Stage>
    );
};

export default KonnakolPlayer;