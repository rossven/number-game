import React, { useState, useRef, useEffect } from 'react';
import { Alert, Animated } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { SinglePlayerScreen } from './screens/SinglePlayerScreen';
import { MultiplayerGameScreen } from './screens/MultiplayerGameScreen';
import { MultiplayerLobbyScreen } from './screens/MultiplayerLobbyScreen';
import { checkGuess } from '../utils/numberGenerator';
import { useSinglePlayerGame } from '../hooks/useSinglePlayerGame';
import { GameState } from '../types';
import { GameMessage, GameMode } from '../types/game';
import BluetoothService from '../services/BluetoothService';

type Screen = 'home' | 'game' | 'multiplayer' | 'multiplayerGame';

export default function Main() {
    const [screen, setScreen] = useState<Screen>('home');
    const [difficulty, setDifficulty] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;
    const singlePlayer = useSinglePlayerGame(screen === 'game');

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);
    useEffect(() => {
        const colorCycle = Animated.loop(
            Animated.timing(colorAnim, {
                toValue: 1,
                duration: 8000,
                useNativeDriver: false,
            })
        );
        colorCycle.start();
        return () => colorCycle.stop();
    }, []);

    const [multiplayerDevices, setMultiplayerDevices] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const [mpMyNumber, setMpMyNumber] = useState('');
    const [mpOpponentNumber, setMpOpponentNumber] = useState('');
    const [mpIsMyTurn, setMpIsMyTurn] = useState(false);
    const [mpGameStarted, setMpGameStarted] = useState(false);
    const [mpIWon, setMpIWon] = useState<boolean | null>(null);
    const [mpGameState, setMpGameState] = useState<GameState>({
        targetNumber: '',
        currentGuess: '',
        guesses: [],
        isGameWon: false
    });
    const [showNumberModal, setShowNumberModal] = useState(false);

    const startSinglePlayerGame = (mode: GameMode = 'random') => {
        singlePlayer.startGame(mode);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setScreen('game');
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    };
    const startBluetoothSearch = async () => {
        setIsSearching(true);
        try {
            const bluetooth = BluetoothService.getInstance();
            const paired = await bluetooth.list();
            const available = await bluetooth.discoverUnpairedDevices();
            const allDevices = [...paired, ...available];
            setMultiplayerDevices(allDevices);
        } catch (error) {
            Alert.alert('Hata', 'Cihazlar aranamadı');
        } finally {
            setIsSearching(false);
        }
    };

    const connectToDevice = async (id: string) => {
        try {
            const bluetooth = BluetoothService.getInstance();
            await bluetooth.connect(id);
            setShowNumberModal(true);
            setScreen('multiplayerGame');
            bluetooth.addListener('read', (data: string) => {
                const message: GameMessage = JSON.parse(data);
                handleMultiplayerMessage(message);
            });
        } catch (error) {
            Alert.alert('Hata', 'Cihaza bağlanılamadı');
        }
    };

    const handleMultiplayerMessage = (message: GameMessage) => {
        switch (message.type) {
            case 'NUMBER_SET':
                setMpOpponentNumber(message.data);
                if (mpMyNumber && message.data) {
                    setMpGameStarted(true);
                    setMpIsMyTurn(true);
                }
                break;
            case 'GUESS':
                const result = checkGuess(message.data, mpMyNumber);
                sendMultiplayerMessage({ type: 'RESULT', data: result });
                const isOpponentWon = result.every((r: any) => r === 'green');
                if (isOpponentWon) {
                    sendMultiplayerMessage({ type: 'GAME_OVER', data: { won: true } });
                    setMpIWon(false);
                    setMpGameStarted(false);
                }
                break;
            case 'RESULT':
                const newGuess = {
                    number: mpGameState.currentGuess,
                    result: message.data
                };
                const amIWinner = message.data.every((r: any) => r === 'green');
                setMpGameState(prev => ({
                    ...prev,
                    guesses: [newGuess, ...prev.guesses],
                    currentGuess: '',
                    isGameWon: amIWinner
                }));
                if (amIWinner) {
                    sendMultiplayerMessage({ type: 'GAME_OVER', data: { won: false } });
                    setMpIWon(true);
                    setMpGameStarted(false);
                } else {
                    setMpIsMyTurn(true);
                }
                break;
            case 'GAME_OVER':
                setMpIWon(message.data.won);
                setMpGameStarted(false);
                break;
            case 'PLAY_AGAIN':
                resetMultiplayerGame();
                break;
        }
    };

    const sendMultiplayerMessage = async (message: GameMessage) => {
        try {
            await BluetoothService.getInstance().write(JSON.stringify(message));
        } catch (error) {
            Alert.alert('Hata', 'Mesaj gönderilemedi');
        }
    };

    const handleMpNumberSet = (number: string) => {
        setMpMyNumber(number);
        sendMultiplayerMessage({ type: 'NUMBER_SET', data: number });
        if (mpOpponentNumber) {
            setMpGameStarted(true);
            setMpIsMyTurn(true);
        }
    };

    const handleMpNumberClick = (num: number) => {
        if (mpGameState.currentGuess.length < 4) {
            setMpGameState(prev => ({
                ...prev,
                currentGuess: prev.currentGuess + num
            }));
        }
    };

    const handleMpDelete = () => {
        setMpGameState(prev => ({
            ...prev,
            currentGuess: prev.currentGuess.slice(0, -1)
        }));
    };

    const handleMpGuess = () => {
        if (mpGameState.currentGuess.length === 4) {
            sendMultiplayerMessage({ type: 'GUESS', data: mpGameState.currentGuess });
            setMpIsMyTurn(false);
        }
    };

    const handleMpPlayAgain = () => {
        sendMultiplayerMessage({ type: 'PLAY_AGAIN', data: null });
        resetMultiplayerGame();
    };

    const resetMultiplayerGame = () => {
        setMpMyNumber('');
        setMpOpponentNumber('');
        setMpGameState({
            targetNumber: '',
            currentGuess: '',
            guesses: [],
            isGameWon: false
        });
        setMpIWon(null);
        setMpGameStarted(false);
        setMpIsMyTurn(false);
        setShowNumberModal(true);
    };

    const isEasyMode = difficulty === 0;

    if (screen === 'home') {
        return (
            <HomeScreen
                colorAnim={colorAnim}
                difficulty={difficulty}
                fadeAnim={fadeAnim}
                onDifficultyChange={setDifficulty}
                onStartGame={startSinglePlayerGame}
                onStartMultiplayer={() => setScreen('multiplayer')}
                scaleAnim={scaleAnim}
            />
        );
    }

    if (screen === 'game') {
        return (
            <SinglePlayerScreen
                bestScore={singlePlayer.bestScore}
                canUseHint={singlePlayer.canUseHint}
                colorAnim={colorAnim}
                currentScore={singlePlayer.currentScore}
                digitStatuses={singlePlayer.digitStatuses}
                elapsedSeconds={singlePlayer.elapsedSeconds}
                fadeAnim={fadeAnim}
                gameMode={singlePlayer.gameMode}
                gameState={singlePlayer.gameState}
                hint={singlePlayer.hint}
                isEasyMode={isEasyMode}
                onBack={() => setScreen('home')}
                onDelete={singlePlayer.handleDelete}
                onHint={singlePlayer.handleHint}
                onKeyPress={singlePlayer.handleKeyPress}
                onNumberClick={singlePlayer.handleNumberClick}
                onPlayAgain={() => singlePlayer.startGame(singlePlayer.gameMode)}
                onSubmit={singlePlayer.handleSubmit}
            />
        );
    }

    if (screen === 'multiplayer') {
        return (
            <MultiplayerLobbyScreen
                colorAnim={colorAnim}
                devices={multiplayerDevices}
                fadeAnim={fadeAnim}
                isSearching={isSearching}
                onBack={() => setScreen('home')}
                onConnect={connectToDevice}
                onSearch={startBluetoothSearch}
            />
        );
    }

    if (screen === 'multiplayerGame') {
        const closeMultiplayer = () => {
            BluetoothService.getInstance().disconnect().catch(() => {});
            setScreen('home');
        };

        return (
            <MultiplayerGameScreen
                colorAnim={colorAnim}
                fadeAnim={fadeAnim}
                gameStarted={mpGameStarted}
                gameState={mpGameState}
                iWon={mpIWon}
                isMyTurn={mpIsMyTurn}
                myNumber={mpMyNumber}
                onBack={closeMultiplayer}
                onDelete={handleMpDelete}
                onGuess={handleMpGuess}
                onNumberClick={handleMpNumberClick}
                onNumberModalClose={() => setShowNumberModal(false)}
                onNumberSet={handleMpNumberSet}
                onPlayAgain={handleMpPlayAgain}
                opponentNumber={mpOpponentNumber}
                showNumberModal={showNumberModal}
            />
        );
    }

    return null;
}
