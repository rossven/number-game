import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
    difficulty: number;
    onDifficultyChange: (value: number) => void;
}

export const DifficultySlider: React.FC<Props> = ({ difficulty, onDifficultyChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Zorluk Seviyesi</Text>
            <View style={styles.difficultyContainer}>
                <Pressable
                    style={[
                        styles.doubleBorderWrapper,
                        difficulty === 0 && styles.selectedWrapper
                    ]}
                    onPress={() => onDifficultyChange(0)}
                >
                    <View style={[
                        styles.button,
                        difficulty === 0 && styles.selectedButton
                    ]}>
                        <Text style={[
                            styles.buttonText,
                            difficulty === 0 && styles.selectedText
                        ]}>Açık Mod</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[
                        styles.doubleBorderWrapper,
                        difficulty === 1 && styles.selectedWrapper
                    ]}
                    onPress={() => onDifficultyChange(1)}
                >
                    <View style={[
                        styles.button,
                        difficulty === 1 && styles.selectedButton
                    ]}>
                        <Text style={[
                            styles.buttonText,
                            difficulty === 1 && styles.selectedText
                        ]}>Uzman Mod</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    label: {
        color: '#E2E8F0',
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
        fontWeight: 'bold',
    },
    difficultyContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    doubleBorderWrapper: {
        padding: 2,
        backgroundColor: '#38BDF8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 2,
    },
    selectedWrapper: {
        backgroundColor: '#A78BFA',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#38BDF8',
        backgroundColor: '#162033',
    },
    selectedButton: {
        backgroundColor: '#A78BFA',
        borderColor: '#A78BFA',
    },
    buttonText: {
        color: '#E2E8F0',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    selectedText: {
        color: '#0B1020',
    },
});
