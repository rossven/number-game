import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DigitStatus } from '../types/game';

interface Props {
    isEasyMode: boolean;
    statuses: Record<string, DigitStatus>;
}

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export const DigitTracker: React.FC<Props> = ({ isEasyMode, statuses }) => {
    if (!isEasyMode) {
        return (
            <View style={styles.expertTrackerNotice}>
                <Ionicons name="eye-off" size={16} color="#94A3B8" />
                <Text style={styles.expertTrackerText}>Uzman modda rakam izleme kapalı</Text>
            </View>
        );
    }

    return (
        <View style={styles.digitTracker}>
            {digits.map(num => {
                const status = statuses[String(num)];
                return (
                    <View key={num} style={[styles.trackerDigit, getTrackerStyle(status)]}>
                        <Text style={[styles.trackerDigitText, status === 'unused' && styles.trackerDigitTextMuted]}>
                            {num}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const getTrackerStyle = (status: DigitStatus) => {
    switch (status) {
        case 'green':
            return styles.trackerGreen;
        case 'yellow':
            return styles.trackerYellow;
        case 'none':
            return styles.trackerNone;
        default:
            return styles.trackerUnused;
    }
};

const styles = StyleSheet.create({
    digitTracker: {
        width: '92%',
        maxWidth: 380,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.74)',
        borderWidth: 1,
        borderColor: '#1F8AC0',
    },
    trackerDigit: {
        width: 28,
        height: 28,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    trackerUnused: {
        borderColor: '#334155',
        backgroundColor: '#0F172A',
    },
    trackerNone: {
        borderColor: '#475569',
        backgroundColor: '#111827',
    },
    trackerYellow: {
        borderColor: '#FBBF24',
        backgroundColor: '#231B0A',
    },
    trackerGreen: {
        borderColor: '#4ADE80',
        backgroundColor: '#0D2618',
    },
    trackerDigitText: {
        color: '#E2E8F0',
        fontSize: 14,
        fontWeight: '900',
    },
    trackerDigitTextMuted: {
        color: '#64748B',
    },
    expertTrackerNotice: {
        width: '92%',
        maxWidth: 380,
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.74)',
        borderWidth: 1,
        borderColor: '#334155',
    },
    expertTrackerText: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '800',
    },
});
