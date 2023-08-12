import { shortestOf } from "util";
import { noteForDisplay } from "./common";
import { AUGMENTED_TRIAD, DIMINISHED_TRIAD, MAJOR_DIM_TRIAD, MAJOR_TRIAD, MINOR_TRIAD, POWER_TRIAD, SUS2_TRIAD, SUS4_TRIAD } from "./triads";
import { explodeChord } from "instrument/guitar";
const CHORD_LIBRARY = {};
{
    const add = (names, baseTriad, extensions) => {
        const chordType = { names, baseTriad, extensions };
        chordType.names.forEach((key) => {
            if (key in CHORD_LIBRARY)
                throw new Error(`Duplicate chord type name: ${key}`);
            CHORD_LIBRARY[key] = chordType;
        });
    };
    add(['aug'], AUGMENTED_TRIAD);
    add(['aug7'], AUGMENTED_TRIAD, [11]);
    add(['maj7♯11', '♯11'], AUGMENTED_TRIAD, [11, 18]); // lydian chord
    add(['', 'maj', 'major'], MAJOR_TRIAD);
    add(['6'], MAJOR_TRIAD, [9]);
    add(['6add9'], MAJOR_TRIAD, [9, 14]);
    add(['7', 'majm7'], MAJOR_TRIAD, [10]);
    add(['7♯9'], MAJOR_TRIAD, [10, 15]); // hendrix chord
    add(['maj7', '11', 'add11'], MAJOR_TRIAD, [11]);
    add(['maj9'], MAJOR_TRIAD, [11, 14]);
    add(['add9'], MAJOR_TRIAD, [14]);
    add(['11'], MAJOR_TRIAD, [10, 14, 17]);
    add(['maj11'], MAJOR_TRIAD, [11, 14, 17]);
    add(['maj13'], MAJOR_TRIAD, [11, 14, 18, 21]);
    add(['b5'], MAJOR_DIM_TRIAD);
    add(['m', 'min', 'minor'], MINOR_TRIAD);
    add(['m6', 'mmaj6'], MINOR_TRIAD, [9]);
    add(['m6/9'], MINOR_TRIAD, [9, 14]);
    add(['m7'], MINOR_TRIAD, [10]);
    add(['mmaj7', 'm11', 'madd11'], MINOR_TRIAD, [11]);
    add(['m11'], MINOR_TRIAD, [10, 14, 17]);
    add(['°', 'dim', 'm♭5'], DIMINISHED_TRIAD);
    add(['°7', 'dim7'], DIMINISHED_TRIAD, [9]);
    add(['ø7', 'm7'], DIMINISHED_TRIAD, [10]); // "half-diminished"
    add(['°M7', 'dimM7', 'm♭5add11'], DIMINISHED_TRIAD, [11]);
    add(['5'], POWER_TRIAD);
    add(['sus2'], SUS2_TRIAD);
    add(['7sus2'], SUS2_TRIAD, [11]);
    add(['sus4'], SUS4_TRIAD);
    add(['7sus4'], SUS4_TRIAD, [11]);
    add(['9sus4'], SUS4_TRIAD, [10, 14]);
}
export const lookupChord = (chord) => {
    const { root, suffix } = (typeof chord === 'string' ? explodeChord(chord) : chord);
    const [baseSuffix, bassNote] = suffix.split('/');
    const lookupKey = baseSuffix.trim().toLowerCase();
    if (!(lookupKey in CHORD_LIBRARY)) {
        throw new Error(`Could not find ${lookupKey} in chord library (from: ${root} ${suffix})`);
    }
    return {
        rootNote: root,
        bassNote,
        type: CHORD_LIBRARY[lookupKey],
    };
};
export const chordForDisplay = (chord, context = {}) => {
    const name = context.compact ? shortestOf(chord.type.names) : chord.type.names[0];
    const root = noteForDisplay(chord.rootNote, context);
    const over = chord.bassNote ? `/${noteForDisplay(chord.bassNote, context)}` : '';
    const space = context.compact ? ' ' : '';
    return `${root}${space}${name}${over}`;
};
//# sourceMappingURL=chords.js.map