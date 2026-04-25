import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GameMode } from '../types/game';

interface Props {
    mode: GameMode;
    elapsedTime: string;
    score: number;
    bestScore: number;
}

export const GameStatsPanel: React.FC<Props> = ({ mode, elapsedTime, score, bestScore }) => (
    <View style={styles.statsPanel}>
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>Mod</Text>
            <Text style={styles.statValue}>{mode === 'daily' ? 'Günlük' : 'Serbest'}</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>Süre</Text>
            <Text style={styles.statValue}>{elapsedTime}</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>Skor</Text>
            <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>En İyi</Text>
            <Text style={styles.statValue}>{bestScore || '-'}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    statsPanel: {
        position: 'absolute',
        top: 42,
        left: 54,
        right: 14,
        zIndex: 20,
        flexDirection: 'row',
        gap: 8,
    },
    statItem: {
        flex: 1,
        minHeight: 48,
        borderWidth: 1,
        borderColor: '#1F8AC0',
        borderRadius: 8,
        backgroundColor: 'rgba(22, 32, 51, 0.78)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    statLabel: {
        color: '#94A3B8',
        fontSize: 11,
        fontWeight: '700',
    },
    statValue: {
        color: '#E2E8F0',
        fontSize: 15,
        fontWeight: '900',
        marginTop: 2,
    },
});
