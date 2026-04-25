import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    onNumberClick: (num: number) => void;
    onDelete: () => void;
    onSubmit: () => void;
    currentGuess: string;
}

export const NumberInput: React.FC<Props> = ({ onNumberClick, onDelete, onSubmit, currentGuess }) => {
    const isButtonDisabled = (num: number) =>
        currentGuess.length >= 4 ||
        currentGuess.includes(num.toString()) ||
        (currentGuess.length === 0 && num === 0);

    return (
        <View style={styles.container}>
            <View style={styles.numbers}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <TouchableOpacity
                        key={num}
                        onPress={() => onNumberClick(num)}
                        disabled={isButtonDisabled(num)}
                        style={[
                            styles.doubleBorderWrapper,
                            isButtonDisabled(num) && styles.disabledWrapper
                        ]}
                    >
                        <View style={[
                            styles.numberButton,
                            isButtonDisabled(num) && styles.disabledButton
                        ]}>
                            <Text style={[
                                styles.numberText,
                                !isButtonDisabled(num) && styles.activeText
                            ]}>{num}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={onDelete} style={styles.doubleBorderWrapper}>
                    <View style={styles.controlButton}>
                        <Text style={styles.controlText}>Sil</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onSubmit}
                    disabled={currentGuess.length !== 4}
                    style={[
                        styles.doubleBorderWrapper,
                        currentGuess.length === 4 && styles.activeSubmitWrapper
                    ]}
                >
                    <View style={[
                        styles.controlButton,
                        currentGuess.length === 4 && styles.activeSubmit
                    ]}>
                        <Text style={[
                            styles.controlText,
                            currentGuess.length === 4 && styles.activeSubmitText
                        ]}>Tahmin Et</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#0B1020',
        borderTopWidth: 3,
        borderTopColor: '#38BDF8',
    },
    doubleBorderWrapper: {
        padding: 2,
        backgroundColor: '#38BDF8',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 2,
    },
    disabledWrapper: {
        opacity: 0.4,
    },
    activeSubmitWrapper: {
        backgroundColor: '#4ADE80',
    },
    numbers: {
        width: '100%',
        maxWidth: 320,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 15,
    },
    numberButton: {
        backgroundColor: '#162033',
        width: 58,
        height: 58,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#38BDF8',
    },
    numberText: {
        color: '#64748B',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    activeText: {
        color: '#E2E8F0',
    },
    disabledButton: {
        backgroundColor: '#111827',
    },
    controls: {
        width: '100%',
        maxWidth: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    controlButton: {
        backgroundColor: '#162033',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#38BDF8',
    },
    activeSubmit: {
        backgroundColor: '#4ADE80',
        borderColor: '#4ADE80',
    },
    controlText: {
        color: '#E2E8F0',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    activeSubmitText: {
        color: '#08111F',
    },
});
