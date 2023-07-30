import { Chord, ExplodedChord } from "./guitar";
import { Note } from "./common";
/**
 *
 * @param chord
 * @returns undefined if we don't have
 */
export declare const getTriadNotes: (chord: ExplodedChord) => Note[] | undefined;
export declare const getRomanNumeral: (keyName: string, chord: ExplodedChord | Chord) => string;
