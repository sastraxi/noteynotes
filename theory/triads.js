import { Interval, Progression, RomanNumeral, transpose } from "tonal";
import { ALL_GUITAR_CHORDS, explodeChord } from "../instrument/guitar";
import { ENHARMONIC_DISPLAY_FOR_KEYNAME, displayAccidentals } from "./common";
import { memoize } from "../util";
export const POWER_TRIAD = [0, 7]; // yes, it's not a triad. sue me
export const SUS2_TRIAD = [2, 5];
export const SUS4_TRIAD = [5, 2];
export const MINOR_TRIAD = [3, 4];
export const MAJOR_TRIAD = [4, 3];
export const MAJOR_DIM_TRIAD = [4, 2]; // e.g. 9b5
export const DIMINISHED_TRIAD = [3, 3];
export const AUGMENTED_TRIAD = [4, 4];
const DIMINISHED_TRIADS = [DIMINISHED_TRIAD, MAJOR_DIM_TRIAD];
/**
 * Return the three component notes of a given triad starting
 * on a given root note (with or without octave).
 */
export const buildTriad = (rootNote, triad) => ([
    rootNote,
    transpose(rootNote, Interval.fromSemitones(triad[0])),
    transpose(rootNote, Interval.fromSemitones(triad[0] + triad[1])),
]);
const ALL_CHORD_SUFFIXES = new Set();
{
    ALL_GUITAR_CHORDS.forEach((value) => {
        ALL_CHORD_SUFFIXES.add(value.suffix);
    });
}
const SUFFIX_TO_TRIAD = {};
{
    let remainingSuffixes = [...ALL_CHORD_SUFFIXES];
    const mark = (triad, pred) => {
        remainingSuffixes.filter(pred).forEach(x => SUFFIX_TO_TRIAD[x] = triad);
        remainingSuffixes = remainingSuffixes.filter(x => !pred(x));
    };
    mark(DIMINISHED_TRIAD, x => x.startsWith('dim'));
    mark(MAJOR_TRIAD, x => x.startsWith('maj'));
    mark(MINOR_TRIAD, x => x.startsWith('min'));
    mark(MINOR_TRIAD, x => x.startsWith('m/'));
    mark(MINOR_TRIAD, x => x.startsWith('mmaj'));
    mark(SUS2_TRIAD, x => x.includes('sus2'));
    mark(SUS4_TRIAD, x => x.includes('sus4'));
    mark(MAJOR_TRIAD, x => x.startsWith('/'));
    mark(MAJOR_TRIAD, x => x === '69');
    mark(MINOR_TRIAD, x => x.startsWith('m'));
    mark(POWER_TRIAD, x => x === '5');
    mark(MAJOR_TRIAD, x => x === 'add9');
    mark(MAJOR_DIM_TRIAD, x => x.includes('b5'));
    mark(AUGMENTED_TRIAD, x => x.includes('aug'));
    mark(MAJOR_TRIAD, x => !isNaN(+x.charAt(0)));
    mark(MAJOR_DIM_TRIAD, x => x === 'alt'); // jazz parlance?
    // that does all the suffixes
    // TODO: cache this list?
}
/**
 * TODO: remove this and instead use the methods in chord
 * @param chord
 * @returns undefined if we don't have
 */
export const getTriadNotes = (chord) => {
    const triad = SUFFIX_TO_TRIAD[chord.suffix];
    if (!triad)
        return undefined;
    return buildTriad(chord.root, triad);
};
const NUMERAL_MAP = {
    "I": "Ⅰ",
    "II": "Ⅱ",
    "III": "Ⅲ",
    "IV": "Ⅳ",
    "V": "Ⅴ",
    "VI": "Ⅵ",
    "VII": "Ⅶ",
    "i": "ⅰ",
    "ii": "ⅱ",
    "iii": "ⅲ",
    "iv": "ⅳ",
    "v": "ⅴ",
    "vi": "ⅵ",
    "vii": "ⅶ"
};
export const getRomanNumeral = memoize((keyName, chord) => {
    const explodedChord = (typeof chord === 'string' ? explodeChord(chord) : chord);
    const { suffix } = explodedChord;
    const root = ENHARMONIC_DISPLAY_FOR_KEYNAME[keyName][explodedChord.root];
    const keyTonic = keyName.split(' ')[0]; // XXX: not great Bob
    // FIXME: I still saw one sharp somewhere I didn't expect. Maybe a bad chord?
    const triad = SUFFIX_TO_TRIAD[suffix];
    let symbol = '';
    if (DIMINISHED_TRIADS.includes(triad)) {
        symbol = '°';
    }
    else if (AUGMENTED_TRIAD === triad) {
        symbol = '⁺';
    }
    else if (suffix.includes('sus')) {
        // this is crazy!
        symbol = 'ₛᵤₛ';
    }
    // this is a hacky, very bad function.
    // I just kinda kept adding things until it looked correct
    // TODO: fix this garbage, probably write our own roman conversion from scratch
    let chordName;
    if (suffix.match(/^m(in|add|[/]|maj|\d+)/)) {
        chordName = `${root} m`;
    }
    else if (suffix.startsWith('alt')) {
        // this is crazy!
        chordName = `${root} major`;
    }
    else if (suffix.startsWith('dim')) {
        // this is crazy!
        chordName = `${root} alt`;
    }
    else {
        chordName = `${root} ${suffix}`;
    }
    const rawNumeral = Progression.toRomanNumerals(keyTonic, [chordName])[0];
    const ret = RomanNumeral.get(rawNumeral);
    const { acc, roman, empty, chordType } = ret;
    // console.info(`roman numeral: ${chordName} -> ${rawNumeral} -> ${JSON.stringify(ret)}`)
    if (empty) {
        return "?";
    }
    // this is hacky
    const numeral = (chordType === 'm' || chordType === 'alt') ? NUMERAL_MAP[roman.toLowerCase()] : NUMERAL_MAP[roman];
    return `${displayAccidentals(acc ?? '')}${numeral}${symbol}`;
});
//# sourceMappingURL=triads.js.map