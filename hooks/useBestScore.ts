import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const storageKey = 'sayibilmece-best-score';

export const useBestScore = () => {
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const storedBestScore = (globalThis as any).localStorage?.getItem(storageKey);
        if (storedBestScore) {
            setBestScore(Number(storedBestScore));
        }
    }, []);

    const updateBestScore = (score: number) => {
        setBestScore(prev => {
            const nextBest = Math.max(prev, score);
            if (Platform.OS === 'web') {
                (globalThis as any).localStorage?.setItem(storageKey, String(nextBest));
            }
            return nextBest;
        });
    };

    return { bestScore, updateBestScore };
};
