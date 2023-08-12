import { Chord, ExplodedChord } from "../instrument/guitar";
import { Note } from "./common";
/**
 * Number of semitones in the two nonoverlapping sub-intervals that make up a triad.
 */
export type Triad = Readonly<[number, number]>;
export declare const POWER_TRIAD: Triad;
export declare const SUS2_TRIAD: Triad;
export declare const SUS4_TRIAD: Triad;
export declare const MINOR_TRIAD: Triad;
export declare const MAJOR_TRIAD: Triad;
export declare const MAJOR_DIM_TRIAD: Triad;
export declare const DIMINISHED_TRIAD: Triad;
export declare const AUGMENTED_TRIAD: Triad;
/**
 * Return the three component notes of a given triad starting
 * on a given root note (with or without octave).
 */
export declare const buildTriad: (rootNote: Note, triad: readonly [number, number]) => Note[];
/**
 * TODO: remove this and instead use the methods in chord
 * @param chord
 * @returns undefined if we don't have
 */
export declare const getTriadNotes: (chord: ExplodedChord) => Note[] | undefined;
export declare const getRomanNumeral: (keyName: string, chord: ExplodedChord | Chord) => string;
