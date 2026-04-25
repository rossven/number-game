import { Platform, Vibration } from 'react-native';
import { FeedbackType } from '../types/game';

export const playFeedback = (type: FeedbackType) => {
    if (Platform.OS !== 'web') {
        Vibration.vibrate(type === 'win' ? [0, 80, 40, 120] : 18);
        return;
    }

    const AudioContextClass = (globalThis as any).AudioContext || (globalThis as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const frequencies = {
        tap: 420,
        submit: 560,
        hint: 720,
        win: 880,
    };

    oscillator.frequency.value = frequencies[type];
    oscillator.type = type === 'win' ? 'triangle' : 'sine';
    gain.gain.value = 0.035;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + (type === 'win' ? 0.22 : 0.08));
};
