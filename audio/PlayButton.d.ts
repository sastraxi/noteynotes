import { type MIDISoundPlayer } from 'midi-sounds-react';
import './PlayButton.css';
type Props = {
    player: MIDISoundPlayer;
    /**
     * Which MIDI instrument bank should we use?
     */
    instrument: number;
    /**
     * Anything that can be converted to MIDI by tonal
     */
    notes: Array<string>;
    strumDurationMs?: number;
    strumDown?: boolean;
    activeDurationMs?: number;
    noteDurationMs?: number;
};
declare const PlayButton: ({ player, instrument, notes, activeDurationMs, strumDown, strumDurationMs, noteDurationMs, }: Props) => import("react/jsx-runtime").JSX.Element;
export default PlayButton;
