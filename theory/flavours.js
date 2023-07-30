import { upperBound } from "../util";
import { isOverChord } from "./guitar";
//////////////////////////////////////////////////////////
const MaxPower = {
    name: "MAX POWER!",
    suffixes: {
        whitelist: new Set(['5']),
    }
};
const Basic = {
    name: "Basic stuff",
    suffixes: {
        whitelist: new Set(['major', 'minor', 'sus4', 'maj7']),
    }
};
export const Balanced = {
    name: "Balanced",
    chordWeightingFunc: ({ chord, accidentalScaleDegreesWithOctaves }) => {
        if (chord.suffix === 'major' || chord.suffix === 'minor')
            return 5000;
        return Math.pow(Math.max(1, 3 - accidentalScaleDegreesWithOctaves.length), 5)
            + (isOverChord(chord) ? 8 : 0);
    },
    suffixes: {
        blacklist: new Set(['5', 'sus2sus4', 'aug', 'aug9', 'maj7b5', 'maj7#5', 'mmaj7b5', '9#11', 'm7b5', 'alt']),
    }
};
const ExtremelyWeird = {
    name: "Extremely weird",
    chordWeightingFunc: ({ accidentalScaleDegreesWithOctaves }) => {
        // more accidentals --> more likely to be selected
        return Math.pow(1 + accidentalScaleDegreesWithOctaves.length, 2);
    }
};
//////////////////////////////////////////////////////////
export const FLAVOUR_CHOICES = [
    MaxPower,
    Basic,
    Balanced,
    // 'Not weird',
    // 'Kinda weird',
    // 'Jazzy extensions',
    ExtremelyWeird,
];
export const getMakeFlavourChoice = (flavour, chords) => {
    const weightingFunc = flavour.chordWeightingFunc ?? (() => 1);
    // apply whitelist / blacklist
    let candidates;
    if (flavour.suffixes?.whitelist) {
        candidates = chords.filter(x => flavour.suffixes?.whitelist?.has(x.chord.suffix));
    }
    else if (flavour.suffixes?.blacklist) {
        candidates = chords.filter(x => !flavour.suffixes?.blacklist?.has(x.chord.suffix));
    }
    else {
        candidates = chords;
    }
    if (candidates.length === 0) {
        throw new Error("No chords!");
    }
    // calculate each chord weight; maintain a cumulative weight array
    // alongside the candidate chords
    const cumulativeWeight = [];
    for (let i = 0; i < candidates.length; ++i) {
        const lastWeight = i === 0 ? 0 : cumulativeWeight[i - 1];
        const thisWeight = weightingFunc(candidates[i]);
        cumulativeWeight.push(lastWeight + thisWeight);
    }
    const max = cumulativeWeight[cumulativeWeight.length - 1];
    return {
        candidateChords: candidates,
        chooseChord: () => {
            const needle = Math.random() * max;
            const i = upperBound(cumulativeWeight, needle); // binary search the weight
            return candidates[i].chord;
        },
    };
};
//# sourceMappingURL=flavours.js.map