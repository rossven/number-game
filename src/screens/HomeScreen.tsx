import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedBackdrop } from '../../components/AnimatedBackdrop';
import { DifficultySlider } from '../../components/DifficultySlider';
import { GameMode } from '../../types/game';

interface Props {
    colorAnim: Animated.Value;
    difficulty: number;
    fadeAnim: Animated.Value;
    onDifficultyChange: (difficulty: number) => void;
    onStartGame: (mode: GameMode) => void;
    onStartMultiplayer: () => void;
    scaleAnim: Animated.Value;
}

export const HomeScreen: React.FC<Props> = ({
    colorAnim,
    difficulty,
    fadeAnim,
    onDifficultyChange,
    onStartGame,
    onStartMultiplayer,
    scaleAnim,
}) => (
    <View style={styles.container}>
        <AnimatedBackdrop colorAnim={colorAnim} lineCount={14} />
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.vaultMark}>
                <Ionicons name="lock-closed" size={38} color="#4ADE80" />
                <View style={styles.vaultMarkDot} />
            </View>
            <Animated.Text style={[styles.title, styles.neonText]}>
                Sayı Bilmece
            </Animated.Text>
            <Text style={styles.subtitle}>
                4 haneli şifreyi kır
            </Text>

            <DifficultySlider
                difficulty={difficulty}
                onDifficultyChange={onDifficultyChange}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => onStartGame('random')}
                    activeOpacity={0.8}
                >
                    <Ionicons name="game-controller" size={28} color="#38BDF8" style={styles.buttonIcon} />
                    <Text style={styles.startButtonText}>Tek Kişilik</Text>
                    <View style={styles.buttonGlow} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.startButton, styles.dailyButton]}
                    onPress={() => onStartGame('daily')}
                    activeOpacity={0.8}
                >
                    <Ionicons name="calendar" size={28} color="#4ADE80" style={styles.buttonIcon} />
                    <Text style={styles.startButtonText}>Günlük Şifre</Text>
                    <View style={[styles.buttonGlow, styles.dailyGlow]} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.startButton, styles.multiplayerButton]}
                    onPress={onStartMultiplayer}
                    activeOpacity={0.8}
                >
                    <Ionicons name="people" size={28} color="#A78BFA" style={styles.buttonIcon} />
                    <Text style={styles.startButtonText}>Eşli Oyun</Text>
                    <View style={[styles.buttonGlow, styles.multiplayerGlow]} />
                </TouchableOpacity>
            </View>
            <View style={styles.decorationContainer}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
            </View>
        </Animated.View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060B16',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    vaultMark: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 3,
        borderColor: '#38BDF8',
        backgroundColor: '#101A2E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
        elevation: 4,
    },
    vaultMarkDot: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        right: 12,
        top: 16,
        backgroundColor: '#FBBF24',
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
    buttonContainer: {
        width: '100%',
        gap: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    startButton: {
        backgroundColor: '#162033',
        borderWidth: 3,
        borderColor: '#38BDF8',
        paddingHorizontal: 50,
        paddingVertical: 18,
        borderRadius: 8,
        width: '85%',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.45,
        shadowRadius: 0,
        elevation: 2,
    },
    multiplayerButton: {
        borderColor: '#A78BFA',
        backgroundColor: '#162033',
    },
    dailyButton: {
        borderColor: '#4ADE80',
        backgroundColor: '#162033',
    },
    buttonIcon: {
        marginRight: 8,
    },
    startButtonText: {
        color: '#E2E8F0',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
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
    multiplayerGlow: {
        backgroundColor: 'rgba(167, 139, 250, 0.14)',
    },
    dailyGlow: {
        backgroundColor: 'rgba(74, 222, 128, 0.12)',
    },
    decorationContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: '#38BDF8',
    },
    topLeft: {
        top: 20,
        left: 20,
        borderTopWidth: 3,
        borderLeftWidth: 3,
    },
    topRight: {
        top: 20,
        right: 20,
        borderTopWidth: 3,
        borderRightWidth: 3,
    },
    bottomLeft: {
        bottom: 20,
        left: 20,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
    },
    bottomRight: {
        bottom: 20,
        right: 20,
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
});
