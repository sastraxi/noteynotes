import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { Midi } from 'tonal';
import './PlayButton.css';
import IconButton from '../components/IconButton';
const MS_TO_SEC = 0.001;
const PlayButton = ({ player, instrument, notes, activeDurationMs = 1000, strumDown = true, strumDurationMs = 300, noteDurationMs = 500, }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        if (player) {
            player.setEchoLevel(0.1);
            player.setMasterVolume(0.45);
            player.cacheInstrument(instrument);
        }
    }, [player, instrument]);
    const playSound = useCallback(() => {
        if (!player)
            return;
        const offsetSec = MS_TO_SEC * (strumDurationMs / notes.length);
        notes.forEach((note, index) => {
            const order = strumDown ? index : (notes.length - 1 - index);
            player.playChordAt(player.contextTime() + offsetSec * order, instrument, [Midi.toMidi(note)], MS_TO_SEC * noteDurationMs);
        });
        setTimeout(() => setIsPlaying(false), activeDurationMs);
    }, [instrument, noteDurationMs, strumDown, strumDurationMs, player, notes, activeDurationMs]);
    useEffect(() => {
        if (isPlaying) {
            playSound();
        }
    }, [isPlaying, playSound]);
    return (_jsx(_Fragment, { children: _jsx(IconButton, { type: "volume", active: isPlaying, onClick: () => setIsPlaying(!isPlaying) }) }));
};
export default PlayButton;
//# sourceMappingURL=PlayButton.js.map