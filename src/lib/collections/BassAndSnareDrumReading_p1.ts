import { KonnakolMelody, MelodyCollection } from "../DataModels"
import { D } from "../MusicConstants"

export const BassAndSnareDrumReadinP1Collection: MelodyCollection = {
	id: "bass_and_snare_drum_reading_p1",
	order: 3,
	name: "Bass And Snare Drum Reading, part 1",
	description: "Practice coordination between bass and snare drum",
}

export const BassAndSnareDrumReadinP1Melodies: KonnakolMelody[] = [
	{
		id: "bass_and_snare_p1",
		name: "Exercise 1",
		description: "4 4 4 4",
		order: 1,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },
		]
	},
	{
		id: "bass_and_snare_p2",
		name: "Exercise 2",
		description: "4 3 1 4 4",
		order: 2,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },
		]
	},
	{
		id: "bass_and_snare_p3",
		name: "Exercise 3",
		description: "4 4 4 3 1",
		order: 3,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_4",
		name: "Exercise 4",
		description: "4 3 1 4 3 1",
		order: 4,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_5",
		name: "Exercise 5",
		description: "4 2 2 4 4",
		order: 5,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_6",
		name: "Exercise 6",
		description: "4 4 4 2 2",
		order: 6,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_7",
		name: "Exercise 7",
		description: "4 2 2 4 2 2",
		order: 7,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_8",
		name: "Exercise 8",
		description: "4 1 3 4 4",
		order: 8,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_9",
		name: "Exercise 9",
		description: "4 4 4 1 3",
		order: 9,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_10",
		name: "Exercise 10",
		description: "4 1 3 4 1 3",
		order: 10,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 3 },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [D.HH], konnakol: "ta" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_11",
		name: "Exercise 11",
		description: "4 1 2 1 4 4",
		order: 11,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_12",
		name: "Exercise 12",
		description: "4 4 4 1 2 1",
		order: 12,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_13",
		name: "Exercise 13",
		description: "4 1 2 1 4 1 2 1",
		order: 13,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_14",
		name: "Exercise 14",
		description: "4 2 1 1 4 4",
		order: 14,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_15",
		name: "Exercise 15",
		description: "4 4 4 2 1 1",
		order: 15,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },
		]
	},
	{
		id: "rhythmic_exercises_p1_ex_16",
		name: "Exercise 16",
		description: "4 2 1 1 4 2 1 1",
		order: 16,
		instruments: [D.HH, D.Snare, D.Kick],
		beats: [
			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 4 },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [D.HH], konnakol: "mi" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [D.HH], konnakol: "ka" },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },

			{ notes: [D.HH, D.Kick], konnakol: "Ta", main: true, num: 1 },
		]
	},
]



