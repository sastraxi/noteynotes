import { ChordSuffix } from "./guitar";
import { ChordAndAccidentals } from "./keys";
export type Flavour = {
    name: string;
    /**
     * An optional weighting function, allowing the flavour to bias
     * random chord generation towards certain types of chords. If
     * omitted, each chord is given a weighting of 1.
     *
     * @param candidate the candidate chord (w/ suffix & accidentals)
     *                  to consider
     *
     * @returns a number representing the weight of the given chord
     *          when we are randomly choosing a chord. If the result
     *          is less than or equal to 0, the chord in question will
     *          never be selected.
     */
    chordWeightingFunc?: (candidate: ChordAndAccidentals) => number;
    suffixes?: {
        /**
         * e.g. we might not want mmaj7 chords
         */
        whitelist?: Readonly<Set<ChordSuffix>>;
        /**
         * e.g. we might just want power chords
         */
        blacklist?: Readonly<Set<ChordSuffix>>;
    };
};
export declare const Balanced: Flavour;
export declare const FLAVOUR_CHOICES: Readonly<Array<Flavour>>;
export declare const getMakeFlavourChoice: (flavour: Flavour, chords: Array<ChordAndAccidentals>) => {
    candidateChords: ChordAndAccidentals[];
    chooseChord: () => import("./guitar").ExplodedChord;
};
