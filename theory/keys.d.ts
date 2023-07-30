import { Note } from "./common";
import { ExplodedChord } from "./guitar";
export type ChordSearchParams = {
    /**
     * The notes of the scale, without octaves.
     */
    scaleNotes: string[];
    maxAccidentals?: number;
};
export type ChordAndAccidentals = {
    chord: ExplodedChord;
    accidentalScaleDegreesWithOctaves: number[];
};
/**
 * Which chords are inside of the scale we're interested in?
 */
export declare const chordsMatchingCondition: ({ scaleNotes, }: ChordSearchParams) => Array<ChordAndAccidentals>;
/**
 * N.B. only does keys based on the major scales right now.
 */
export declare const keysIncludingChord: (chord: ExplodedChord, notes: Array<Note>, { maxAccidentals, onlyBaseTriad, restrictedModes, }?: {
    maxAccidentals?: number | undefined;
    onlyBaseTriad?: boolean | undefined;
    restrictedModes?: string[] | undefined;
}) => string[];
