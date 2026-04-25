import { useEffect, useMemo, useState } from 'react';
import { generateDailyNumber, generateRandomNumber, checkGuess } from '../utils/numberGenerator';
import { calculateScore, getDigitStatuses } from '../utils/gameStats';
import { playFeedback } from '../utils/feedback';
import { useBestScore } from './useBestScore';
import { GameState } from '../types';
import { GameMode } from '../types/game';

export const useSinglePlayerGame = (isActive: boolean) => {
    const [gameMode, setGameMode] = useState<GameMode>('random');
    const [gameStartedAt, setGameStartedAt] = useState<number | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [hint, setHint] = useState('');
    const [hintUsed, setHintUsed] = useState(false);
    const { bestScore, updateBestScore } = useBestScore();
    const [gameState, setGameState] = useState<GameState>({
        targetNumber: '',
        currentGuess: '',
        guesses: [],
        isGameWon: false
    });

    useEffect(() => {
        if (!isActive || gameState.isGameWon || !gameStartedAt) return;

        const interval = setInterval(() => {
            setElapsedSeconds(Math.floor((Date.now() - gameStartedAt) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, gameState.isGameWon, gameStartedAt]);

    const startGame = (mode: GameMode = 'random') => {
        const targetNumber = mode === 'daily' ? generateDailyNumber() : generateRandomNumber();
        setGameMode(mode);
        setGameStartedAt(Date.now());
        setElapsedSeconds(0);
        setHint('');
        setHintUsed(false);
        setGameState({
            targetNumber,
            currentGuess: '',
            guesses: [],
            isGameWon: false
        });
    };

    const handleNumberClick = (num: number) => {
        if (gameState.currentGuess.length < 4) {
            playFeedback('tap');
            setGameState(prev => ({
                ...prev,
                currentGuess: prev.currentGuess + num
            }));
        }
    };

    const handleDelete = () => {
        playFeedback('tap');
        setGameState(prev => ({
            ...prev,
            currentGuess: prev.currentGuess.slice(0, -1)
        }));
    };

    const handleSubmit = () => {
        if (gameState.currentGuess.length !== 4) return;

        playFeedback('submit');
        const result = checkGuess(gameState.currentGuess, gameState.targetNumber);
        const isWon = result.every(r => r === 'green');
        const attempts = gameState.guesses.length + 1;
        const liveElapsedSeconds = gameStartedAt ? Math.floor((Date.now() - gameStartedAt) / 1000) : elapsedSeconds;
        const finalScore = calculateScore(attempts, liveElapsedSeconds, hintUsed);

        if (isWon) {
            setElapsedSeconds(liveElapsedSeconds);
            updateBestScore(finalScore);
            playFeedback('win');
        }

        setGameState(prev => ({
            ...prev,
            guesses: [{
                number: prev.currentGuess,
                result
            }, ...prev.guesses],
            currentGuess: '',
            isGameWon: isWon
        }));
    };

    const handleHint = () => {
        if (hintUsed || gameState.guesses.length < 3 || !gameState.targetNumber) return;

        const index = gameState.guesses.length % 4;
        setHint(`${index + 1}. hane ${gameState.targetNumber[index]}`);
        setHintUsed(true);
        playFeedback('hint');
    };

    const handleKeyPress = (text: string) => {
        if (text === '\n' && gameState.currentGuess.length === 4) {
            handleSubmit();
            return;
        }

        const lastChar = text.slice(-1);
        if (/^[0-9]$/.test(lastChar)) {
            const num = parseInt(lastChar);
            if (gameState.currentGuess.length === 0 && num === 0) return;
            if (gameState.currentGuess.length < 4 && !gameState.currentGuess.includes(lastChar)) {
                handleNumberClick(num);
            }
        }
    };

    return {
        bestScore,
        canUseHint: !hintUsed && gameState.guesses.length >= 3 && !gameState.isGameWon,
        currentScore: calculateScore(gameState.guesses.length, elapsedSeconds, hintUsed),
        digitStatuses: useMemo(() => getDigitStatuses(gameState.guesses), [gameState.guesses]),
        elapsedSeconds,
        gameMode,
        gameState,
        handleDelete,
        handleHint,
        handleKeyPress,
        handleNumberClick,
        handleSubmit,
        hint,
        startGame,
    };
};
