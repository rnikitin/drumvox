import { KonnakolMelody, MelodyCollection } from "../DataModels"

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
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_2",
		name: "Exercise 2",
		description: "Learn Ta ka style",
		order: 2,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_3",
		name: "Exercise 3",
		description: "Learn Ta ki ta style",
		order: 3,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "10", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "11", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_4",
		name: "Exercise 4",
		description: "Learn Ta ka di mi style",
		order: 4,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH","Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "10", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "11", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "15", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "16", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_5",
		name: "Exercise 5",
		description: "Learn Da di gi na dum style",
		order: 5,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "10", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "11", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "13", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "15", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "16", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "17", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "18", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "19", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "20", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },
		]
	},
	{
		id: "konnakol_basics_lesson_6",
		name: "Exercise 6",
		description: "Climb up on the rhythm",
		order: 6,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "2", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "4", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "10", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "11", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "13", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "15", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_7",
		name: "Exercise 7",
		description: "Slide down on the rhythm",
		order: 7,
		instruments: ["HH", "Snare"],
		beats: [

			{ id: "1", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "6", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "10", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "11", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "15", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_8",
		name: "Exercise 8",
		description: "Now lets climb up and then slide down on the rhythm",
		order: 8,
		instruments: ["HH", "Snare"],
		beats: [

			{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "2", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "4", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "10", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "11", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "13", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "15", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "16", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "17", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "18", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "19", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "20", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "21", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "22", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "23", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "24", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_9",
		name: "Exercise 9",
		description: "Guess what? Now we slide down and the climb up!",
		order: 9,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "6", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "10", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "11", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "15", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "16", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "17", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "18", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "19", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "20", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "21", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "22", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "23", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "24", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

		]
	},

	{
		id: "konnakol_basics_lesson_10",
		name: "Exercise 10",
		description: "Double climb up on the rhythm",
		order: 10,
		instruments: ["HH", "Snare"],
		beats: [
			{ id: "1", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "2", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "3", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "5", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "6", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "7", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "10", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "11", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "13", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "15", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "16", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "17", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "18", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "19", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "20", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "21", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "22", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "23", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "24", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "25", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "26", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "27", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "28", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "29", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "30", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },
		]
	},

	{
		id: "konnakol_basics_lesson_11",
		name: "Exercise 11",
		description: "Double slide down on the rhythm",
		order: 11,
		instruments: ["HH", "Snare"],
		beats: [

			{ id: "1", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "2", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "3", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "4", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "5", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "6", notes: ["HH", "Snare"], konnakol: "Da", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "7", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "8", notes: ["HH"], konnakol: "gi" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "9", notes: ["HH"], konnakol: "na" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "10", notes: ["HH"], konnakol: "dum" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "11", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "12", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "13", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "14", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "15", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "16", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "17", notes: ["HH"], konnakol: "di" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "18", notes: ["HH"], konnakol: "mi" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "19", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "20", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "21", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "22", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "23", notes: ["HH"], konnakol: "ki" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "24", notes: ["HH"], konnakol: "ta" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "25", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "26", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "27", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "28", notes: ["HH"], konnakol: "ka" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "29", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },

			{ id: "30", notes: ["HH", "Snare"], konnakol: "Ta", main: true },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
			{ id: "", notes: [], konnakol: "" },
		]
	},

]