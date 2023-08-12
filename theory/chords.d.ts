import { Note, NoteDisplayContext } from "./common";
import { Triad } from "./triads";
import { Chord, ExplodedChord } from "instrument/guitar";
type ChordType = {
    /**
     * What names are this chord known by?
     * e.g. a major diminished chord is known by both "b5" and "alt"
     *      a major chord is known by both "major" and "maj" and ""
     */
    names: string[];
    /**
     * What should be considered the base triad of this chord?
     * These are the number of semitones in the two non-overlapping
     * subintervals that make up a triad (when starting at some root).
     */
    baseTriad: Triad;
    /**
     * In integer notation; semitones above the root note.
     */
    extensions?: number[];
};
type FullChord = {
    rootNote: Note;
    bassNote?: Note;
    type: ChordType;
};
export declare const lookupChord: (chord: Chord | ExplodedChord) => FullChord;
export declare const chordForDisplay: (chord: FullChord, context?: NoteDisplayContext) => string;
export {};
