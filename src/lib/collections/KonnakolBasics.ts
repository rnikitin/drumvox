import { KonnakolMelody, MelodyCollection } from "../DataModels"
import { D } from "../MusicConstants"

export const KonnakolBasicsCollection: MelodyCollection = {
	id: "konnakol_basics",
	order: 1,
	name: "Rhythm Basics",
	description: "Learn basic Konnakol styles and how to play them",
}

export const KonnakolBasics: KonnakolMelody[] = [
	{
		id: "konnakol_basics_lesson_1",
		name: "Exercise 1",
		description: "Learn Ta style. Hit only red",
		order: 1,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_2",
		name: "Exercise 2",
		description: "Learn Ta ka style",
		order: 2,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_3",
		name: "Exercise 3",
		description: "Learn Ta ki ta style",
		order: 3,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_4",
		name: "Exercise 4",
		description: "Learn Ta ka di mi style",
		order: 4,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_5",
		name: "Exercise 5",
		description: "Learn Da di gi na dum style",
		order: 5,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_6",
		name: "Exercise 6",
		description: "Climb up on the rhythm",
		order: 6,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_7",
		name: "Exercise 7",
		description: "Slide down on the rhythm",
		order: 7,
		instruments: [D.HH, D.Snare],
		beats: [

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_8",
		name: "Exercise 8",
		description: "Now lets climb up and then slide down on the rhythm",
		order: 8,
		instruments: [D.HH, D.Snare],
		beats: [

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_9",
		name: "Exercise 9",
		description: "Guess what? Now we slide down and the climb up!",
		order: 9,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

		]
	},

	{
		id: "konnakol_basics_lesson_10",
		name: "Exercise 10",
		description: "Double climb up on the pyramid rhythm",
		order: 10,
		instruments: [D.HH, D.Snare],
		beats: [
			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_11",
		name: "Exercise 11",
		description: "Double slide down on the rhythm",
		order: 11,
		instruments: [D.HH, D.Snare],
		beats: [

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Da", main: true, num: 5 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "gi" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "na" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "dum" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 4 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "di" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "mi" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 3 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ki" },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ta" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 2 },
			{ notes: [], konnakol: "" },
			{ notes: [D.HH], konnakol: "ka" },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },

			{ notes: [D.HH, D.Snare], konnakol: "Ta", main: true, num: 1 },
			{ notes: [], konnakol: "" },
		]
	},

]