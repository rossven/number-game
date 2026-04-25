import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedBackdrop } from '../../components/AnimatedBackdrop';
import { CurrentGuess } from '../../components/CurrentGuess';
import { GuessDisplay } from '../../components/GuessDisplay';
import { NumberInput } from '../../components/NumberInput';
import { NumberSetModal } from '../../components/NumberSetModal';
import { GameState } from '../../types';

interface Props {
    colorAnim: Animated.Value;
    fadeAnim: Animated.Value;
    gameStarted: boolean;
    gameState: GameState;
    iWon: boolean | null;
    isMyTurn: boolean;
    myNumber: string;
    onBack: () => void;
    onDelete: () => void;
    onGuess: () => void;
    onNumberClick: (num: number) => void;
    onNumberModalClose: () => void;
    onNumberSet: (number: string) => void;
    onPlayAgain: () => void;
    opponentNumber: string;
    showNumberModal: boolean;
}

export const MultiplayerGameScreen: React.FC<Props> = ({
    colorAnim,
    fadeAnim,
    gameStarted,
    gameState,
    iWon,
    isMyTurn,
    myNumber,
    onBack,
    onDelete,
    onGuess,
    onNumberClick,
    onNumberModalClose,
    onNumberSet,
    onPlayAgain,
    opponentNumber,
    showNumberModal,
}) => (
    <View style={styles.container}>
        <AnimatedBackdrop colorAnim={colorAnim} lineCount={16} />

        <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#E2E8F0" />
        </TouchableOpacity>

        <Text style={[styles.title, styles.neonText]}>Eşli Oyun</Text>
        <Text style={styles.subtitle}>
            {!myNumber ? 'Sayı bekleniyor...' :
                !opponentNumber ? 'Rakip sayı belirliyor...' :
                    !gameStarted ? 'Oyun başlıyor...' :
                        isMyTurn ? 'Senin Sıran' : 'Rakibin Sırası'}
        </Text>

        <ScrollView style={styles.guessContainer}>
            {gameState.guesses.map((guess, index) => (
                <GuessDisplay
                    key={index}
                    guess={guess}
                    isLatest={index === 0}
                    isEasyMode={true}
                />
            ))}
        </ScrollView>

        {iWon === null && gameStarted && isMyTurn && (
            <>
                <CurrentGuess currentGuess={gameState.currentGuess} />
                <NumberInput
                    onNumberClick={onNumberClick}
                    onDelete={onDelete}
                    onSubmit={onGuess}
                    currentGuess={gameState.currentGuess}
                />
            </>
        )}

        {iWon !== null && (
            <Animated.View style={[styles.winMessage, { opacity: fadeAnim }]}>
                <Animated.Text style={[styles.winText, styles.neonText]}>
                    {iWon ? 'TEBRİKLER! 🎉' : 'KAYBETTİNİZ! 😢'}
                </Animated.Text>
                <View style={styles.winButtons}>
                    <TouchableOpacity
                        style={styles.playAgainButton}
                        onPress={onPlayAgain}
                    >
                        <Ionicons name="refresh" size={20} color="#0B1020" />
                        <Text style={styles.playAgainText}>Tekrar Oyna</Text>
                        <View style={styles.buttonGlow} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.playAgainButton, styles.menuButton]}
                        onPress={onBack}
                    >
                        <Ionicons name="home" size={20} color="#E2E8F0" />
                        <Text style={[styles.playAgainText, styles.menuButtonText]}>Ana Menü</Text>
                        <View style={styles.menuGlow} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )}

        <NumberSetModal
            visible={showNumberModal}
            onClose={onNumberModalClose}
            onNumberSet={onNumberSet}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060B16',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 0,
        padding: 15,
        zIndex: 100,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#E2E8F0',
    },
    subtitle: {
        color: '#94A3B8',
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
        letterSpacing: 1,
    },
    neonText: {
        color: '#38BDF8',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    guessContainer: {
        flex: 1,
        width: '100%',
        marginVertical: 20,
    },
    winMessage: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    winText: {
        fontSize: 28,
        marginBottom: 20,
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
