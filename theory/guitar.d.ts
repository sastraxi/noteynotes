import { VexChordDefinition } from 'vexchords';
import { Note, NoteDisplayContext } from './common';
export type Fretting = {
    frets: number[];
    fingers: number[];
    baseFret: number;
    capo?: boolean;
    barres: number[];
};
export type Chord = string;
export type ChordSuffix = string;
export type ExplodedChord = {
    root: string;
    suffix: ChordSuffix;
};
export declare const isOverChord: ({ suffix }: ExplodedChord) => boolean;
/**
 * Gets a root and a suffix for lookup in the guitar chords database.
 * @param chordName descriptive chord name, e.g. "A#minor"
 * @returns { root, suffix } e.g. { root: "Bb", suffix: "minor" }
 */
export declare const explodeChord: (chordName: Chord) => ExplodedChord;
export declare const combineChord: (chord: ExplodedChord) => Chord;
export declare const chordEquals: (a: ExplodedChord, b: ExplodedChord) => boolean;
export declare const chordForDisplay: (chord: Chord | ExplodedChord, context?: NoteDisplayContext) => string;
/**
 * Looks up all guitar chords for a given chord name in chords-db.
 * @param chordName the chord name, e.g. C/D#, Emmaj7b5, F major
 * @returns
 */
export declare const getFrettings: (chord: Chord | ExplodedChord) => Fretting[];
/**
 * Return all the notes in the given guitar chord.
 * @param chord the chord, e.g. C/D#, Emmaj7b5, F major
 * @param variant which variation of the chord should we pick? Defaults to the first.
 * @returns e.g. ["A2", "C3", "E3"], from lowest-to-highest frequency
 */
export declare const getGuitarNotes: (chord: Chord | ExplodedChord, variant: number) => Array<Note>;
export type ChordDefinition = VexChordDefinition & {
    notes: Note[];
};
export declare const frettingToVexChord: (f: Fretting, displayContext?: NoteDisplayContext) => ChordDefinition;
export declare const ALL_GUITAR_CHORDS: Array<ExplodedChord>;
