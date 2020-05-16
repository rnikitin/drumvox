export type MelodyBeat = {
    id: string;
    notes: string[];
    konnakol: string;
    main?: boolean;
};

export type KonnakolMelody = {
    name: string;
    instruments: string[];
    beats: MelodyBeat[];
}

export const TestMelody:KonnakolMelody = {
    name: "Just a test melody",
    instruments: ["Ride", "HH", "Snare", "Kick"],
    beats: [
        { id: "1", notes: ["Ride"], konnakol: "Ta", main: true },
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
    ]
}


