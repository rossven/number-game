import { Guess } from '../types';
import { DigitStatus } from '../types/game';

export const calculateScore = (
    attemptCount: number,
    elapsedSeconds: number,
    hintUsed: boolean
): number => {
    const timePenalty = Math.floor(elapsedSeconds / 3);
    const hintPenalty = hintUsed ? 15 : 0;
    return Math.max(10, 120 - attemptCount * 8 - timePenalty - hintPenalty);
};

export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getDigitStatuses = (guesses: Guess[]): Record<string, DigitStatus> => {
    const statuses: Record<string, DigitStatus> = {};
    const priority: Record<DigitStatus, number> = {
        unused: 0,
        none: 1,
        yellow: 2,
        green: 3,
    };

    for (let i = 0; i <= 9; i++) {
        statuses[String(i)] = 'unused';
    }

    guesses.forEach(guess => {
        guess.number.split('').forEach((digit, index) => {
            const result = guess.result[index];
            if (priority[result] > priority[statuses[digit]]) {
                statuses[digit] = result;
            }
        });
    });

    return statuses;
};
