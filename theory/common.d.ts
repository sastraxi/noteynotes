/**
 * e.g. C, E2, D#, Eb4
 */
export type Note = string;
export type NoteDisplayContext = {
    keyName?: string;
    scale?: Note[];
    showOctave?: boolean;
};
export type ExplodedNote = {
    name: string;
    octave?: number;
};
/**
 * Ensures that string comparison === note comparison (w/enharmonic equivalents).
 * Doesn't matter what we pick; here we're just always choosing sharps.
 */
export declare const ENHARMONIC_NORMALIZE_MAP: {
    Db: string;
    Eb: string;
    Gb: string;
    Ab: string;
    Bb: string;
};
/**
 * Ensures that every enharmonic note is given the same name.
 * Later, we can put the note back "into context" of the key.
 */
export declare const normalizedNoteName: (noteName: Note) => string;
export declare const noteNameEquals: (a: Note, b: Note, ignoreOctave?: boolean) => boolean;
export declare const MAJOR_MODES_BY_DEGREE: string[];
export declare const keynameToNotes: (keyName: string) => Array<Note>;
export declare const ROOT_NOTES: Array<Note>;
export declare const DEFAULT_RESTRICTED_MODES: string[];
/**
 * e.g. MAJOR_SCALES["C"] = ["C", "D", "E", ...]
 */
export declare const MAJOR_SCALES: Record<Note, Note[]>;
/**
 * Circle of fifths, baby!
 */
export declare const MAJOR_KEY_NAMES: Array<string>;
export declare const KEY_NAMES_BASED_ON_MAJOR: Array<string>;
/**
 * In a given key, provide a mapping that lets us run note names through it
 * and quickly convert enharmonics to the right name for that key.
 * Accidentals are just passed through as is from ROOT_NOTES, but we could
 * probably consider double-sharps / double-flats as well...
 */
export declare const ENHARMONIC_DISPLAY_FOR_KEYNAME: Record<string, Record<Note, Note>>;
/**
 * Replaces # and b with the actual sharp / flat unicode symbols.
 */
export declare const displayAccidentals: (s: string) => string;
export declare const untransformAccidentals: (s: string) => string;
/**
 * "Explodes" a note from string representation into { note, octave? }
 */
export declare const explodeNote: (note: Note) => ExplodedNote;
export declare const combineNote: ({ name, octave }: ExplodedNote) => Note;
export declare const stripOctave: (note: Note | ExplodedNote) => string;
export declare const noteForDisplay: (note: Note | ExplodedNote, { keyName, scale, showOctave }?: NoteDisplayContext) => string;
/**
 * e.g. C major, F lydian
 */
export type ScaleName = string;
