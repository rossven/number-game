import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedBackdrop } from '../../components/AnimatedBackdrop';
import { CurrentGuess } from '../../components/CurrentGuess';
import { DigitTracker } from '../../components/DigitTracker';
import { GameStatsPanel } from '../../components/GameStatsPanel';
import { GuessDisplay } from '../../components/GuessDisplay';
import { HintPanel } from '../../components/HintPanel';
import { NumberInput } from '../../components/NumberInput';
import { formatTime } from '../../utils/gameStats';
import { GameState } from '../../types';
import { DigitStatus, GameMode } from '../../types/game';

interface Props {
    bestScore: number;
    canUseHint: boolean;
    colorAnim: Animated.Value;
    currentScore: number;
    digitStatuses: Record<string, DigitStatus>;
    elapsedSeconds: number;
    fadeAnim: Animated.Value;
    gameMode: GameMode;
    gameState: GameState;
    hint: string;
    isEasyMode: boolean;
    onBack: () => void;
    onDelete: () => void;
    onHint: () => void;
    onKeyPress: (text: string) => void;
    onNumberClick: (num: number) => void;
    onPlayAgain: () => void;
    onSubmit: () => void;
}

export const SinglePlayerScreen: React.FC<Props> = ({
    bestScore,
    canUseHint,
    colorAnim,
    currentScore,
    digitStatuses,
    elapsedSeconds,
    fadeAnim,
    gameMode,
    gameState,
    hint,
    isEasyMode,
    onBack,
    onDelete,
    onHint,
    onKeyPress,
    onNumberClick,
    onPlayAgain,
    onSubmit,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <View style={styles.gameScreenContainer}>
            <AnimatedBackdrop colorAnim={colorAnim} lineCount={16} />

            <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                keyboardType="numeric"
                onChangeText={onKeyPress}
                value=""
                maxLength={1}
                autoFocus
                blurOnSubmit={false}
                returnKeyType="none"
                returnKeyLabel="none"
                onSubmitEditing={() => {
                    if (gameState.currentGuess.length === 4) {
                        onSubmit();
                    }
                }}
            />

            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={28} color="#E2E8F0" />
            </TouchableOpacity>

            <GameStatsPanel
                mode={gameMode}
                elapsedTime={formatTime(elapsedSeconds)}
                score={currentScore}
                bestScore={bestScore}
            />

            {gameState.isGameWon ? (
                <Animated.View style={[styles.gameWinOverlay, { opacity: fadeAnim }]}>
                    <Animated.Text style={[styles.winText, styles.neonText]}>
                        TEBRİKLER! 🎉
                    </Animated.Text>
                    <Text style={styles.winScoreText}>
                        {gameState.guesses.length} tahmin · {formatTime(elapsedSeconds)} · {currentScore} puan
                    </Text>
                    <View style={styles.winButtons}>
                        <TouchableOpacity onPress={onPlayAgain} style={styles.playAgainButton}>
                            <Ionicons name="refresh" size={20} color="#0B1020" />
                            <Text style={styles.playAgainText}>Tekrar Oyna</Text>
                            <View style={styles.buttonGlow} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onBack} style={[styles.playAgainButton, styles.menuButton]}>
                            <Ionicons name="home" size={20} color="#E2E8F0" />
                            <Text style={[styles.playAgainText, styles.menuButtonText]}>Ana Menü</Text>
                            <View style={styles.menuGlow} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            ) : (
                <>
                    <View style={styles.gameTopArea}>
                        <Animated.View style={{ opacity: fadeAnim }}>
                            <CurrentGuess currentGuess={gameState.currentGuess} />
                        </Animated.View>
                        <HintPanel
                            canUseHint={canUseHint}
                            hint={hint}
                            attempts={gameState.guesses.length}
                            onHint={onHint}
                        />
                        <DigitTracker isEasyMode={isEasyMode} statuses={digitStatuses} />
                    </View>

                    <View style={styles.scrollContainer}>
                        <ScrollView
                            ref={scrollViewRef}
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollContent}
                            bounces={false}
                            onScroll={(event) => setIsScrolled(event.nativeEvent.contentOffset.y > 0)}
                            scrollEventThrottle={16}
                        >
                            {gameState.guesses.map((guess, index) => (
                                <Animated.View
                                    key={index}
                                    style={{ opacity: fadeAnim }}
                                >
                                    <GuessDisplay
                                        guess={guess}
                                        isLatest={index === 0}
                                        isEasyMode={isEasyMode}
                                    />
                                </Animated.View>
                            ))}
                        </ScrollView>
                    </View>

                    {isScrolled && (
                        <View style={styles.scrollIndicator}>
                            <View style={styles.scrollIndicatorDot} />
                        </View>
                    )}

                    <View style={styles.gameBottomArea}>
                        <NumberInput
                            onNumberClick={onNumberClick}
                            onDelete={onDelete}
                            onSubmit={onSubmit}
                            currentGuess={gameState.currentGuess}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreenContainer: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 0,
        padding: 15,
        zIndex: 100,
    },
    gameTopArea: {
        alignItems: 'center',
        paddingTop: 150,
        paddingBottom: 10,
        minHeight: 285,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 280,
        position: 'relative',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        minHeight: '100%',
    },
    gameBottomArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    scrollIndicatorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4ADE80',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 1,
    },
    gameWinOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(6, 11, 22, 0.94)',
    },
    neonText: {
        color: '#38BDF8',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    winText: {
        fontSize: 28,
        marginBottom: 20,
    },
    winScoreText: {
        color: '#E2E8F0',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
    },
    winButtons: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 20,
    },
    playAgainButton: {
        backgroundColor: '#4ADE80',
        borderWidth: 3,
        borderColor: '#4ADE80',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 2,
    },
    menuButton: {
        borderColor: '#38BDF8',
        backgroundColor: '#162033',
    },
    buttonGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        borderRadius: 8,
        top: 0,
        left: 0,
    },
    menuGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        borderRadius: 8,
        top: 0,
        left: 0,
    },
    playAgainText: {
        color: '#0B1020',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    menuButtonText: {
        color: '#E2E8F0',
    },
});
