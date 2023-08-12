import { Interval, PcSet } from "tonal";
import { DEFAULT_RESTRICTED_MODES, MAJOR_MODES_BY_DEGREE, MAJOR_SCALES, noteNameEquals } from "./common";
import { ALL_GUITAR_CHORDS, getGuitarNotes } from "../instrument/guitar";
import { getTriadNotes } from "./triads";
/**
 * How many semitones are between the two given notes?
 * The result is not well-defined if octaves are not given.
 */
const semitoneDistance = (from, to) => {
    const semitones = Interval.semitones(Interval.distance(from, to));
    if (semitones === undefined)
        throw new Error(`semitone distance from ${from} to ${to} is undefined`);
    return semitones;
};
/**
 * Which chords are inside of the scale we're interested in?
 */
export const chordsMatchingCondition = ({ scaleNotes, }) => {
    const inScale = PcSet.isNoteIncludedIn(scaleNotes);
    const matchingChords = [];
    for (const chord of ALL_GUITAR_CHORDS) {
        const notes = getGuitarNotes(chord, 0); // XXX: is first chord most indicative?
        const triad = getTriadNotes(chord);
        if (!triad || !triad.every(inScale)) {
            // can't fit this note into any major scale (or our specific one)
            continue;
        }
        // skip chords that don't have the root and bass note in scale
        // TODO: should we look at all notes below root?
        const bassNote = notes[0];
        const rootNote = notes.find(n => noteNameEquals(n, chord.root));
        if (!rootNote) {
            // this indicates an incorrect chord in guitar.json
            console.error(`Incorrect chord in guitar.json: ${chord.root} ${chord.suffix}, but ${notes}`);
            continue;
        }
        if (!inScale(bassNote)) {
            continue;
        }
        // how many accidentals overall in the chord?
        const accidentals = notes
            .filter(note => !inScale(note))
            .map(note => semitoneDistance(rootNote, note));
        matchingChords.push({
            chord,
            accidentalScaleDegreesWithOctaves: accidentals,
        });
    }
    return matchingChords;
};
/**
 * N.B. only does keys based on the major scales right now.
 */
export const keysIncludingChord = (chord, notes, { maxAccidentals = 0, onlyBaseTriad = true, restrictedModes = DEFAULT_RESTRICTED_MODES, } = {}) => {
    // we can optionally skip all the non-core notes (outside the base triad)
    // this is helpful if we want to allow extensions on the chord we're basing
    // key selection around (and is in fact why this code exists...)		
    // if we don't have a triad, fall back to the notes
    const consideredNotes = onlyBaseTriad
        ? (getTriadNotes(chord) ?? notes)
        : notes;
    // find all scales that contain all the given scale notes,
    // with a "slop" factor given by numAccidentals.
    // TODO: remove numAccidentals? We aren't using it (always 0).
    const matchingScales = [];
    for (const scale of Object.values(MAJOR_SCALES)) {
        const inScale = PcSet.isNoteIncludedIn(scale);
        const accidentals = consideredNotes.map(inScale);
        const numAccidentals = accidentals
            .reduce((sum, inScale) => sum + (inScale ? 0 : 1), 0);
        if (numAccidentals <= maxAccidentals) {
            scale.forEach((note, degree) => {
                const mode = MAJOR_MODES_BY_DEGREE[degree];
                if (!restrictedModes.includes(mode)) {
                    matchingScales.push(`${note} ${mode}`);
                }
            });
        }
    }
    return matchingScales;
};
//# sourceMappingURL=keys.js.map