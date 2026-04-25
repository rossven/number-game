import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    canUseHint: boolean;
    hint: string;
    attempts: number;
    onHint: () => void;
}

export const HintPanel: React.FC<Props> = ({ canUseHint, hint, attempts, onHint }) => (
    <View style={styles.hintRow}>
        <TouchableOpacity
            onPress={onHint}
            disabled={!canUseHint}
            style={[styles.hintButton, !canUseHint && styles.hintButtonDisabled]}
        >
            <Ionicons name="bulb" size={17} color={canUseHint ? '#0B1020' : '#64748B'} />
            <Text style={[styles.hintButtonText, !canUseHint && styles.hintButtonTextDisabled]}>
                İpucu
            </Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>
            {hint || (attempts < 3 ? '3 tahminden sonra açılır' : 'Tek ipucu hakkı')}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    hintRow: {
        width: '92%',
        maxWidth: 380,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: -12,
        marginBottom: 12,
    },
    hintButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        backgroundColor: '#FBBF24',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    hintButtonDisabled: {
        backgroundColor: '#162033',
        borderWidth: 1,
        borderColor: '#334155',
    },
    hintButtonText: {
        color: '#0B1020',
        fontWeight: '900',
        fontSize: 13,
    },
    hintButtonTextDisabled: {
        color: '#64748B',
    },
    hintText: {
        flex: 1,
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '700',
    },
});
