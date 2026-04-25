import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    currentGuess: string;
}

export const CurrentGuess: React.FC<Props> = ({ currentGuess }) => {
    const digits = currentGuess.split('');

    while (digits.length < 4) {
        digits.push('');
    }

    return (
        <View style={styles.container}>
            {digits.map((digit, index) => (
                <View
                        key={index}
                        style={[
                            styles.doubleBorderWrapper,
                            digit ? styles.filledWrapper : null
                        ]}
                    >
                        <View style={[
                            styles.digitBox,
                            digit ? styles.filledDigit : null
                        ]}>
                            <Text style={[
                                styles.digitText,
                                digit ? styles.filledText : null
                            ]}>{digit}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 30,
    },
    doubleBorderWrapper: {
        padding: 3,
        backgroundColor: '#38BDF8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 2,
    },
    filledWrapper: {
        backgroundColor: '#A78BFA',
    },
    digitBox: {
        width: 60,
        height: 65,
        borderWidth: 2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        borderColor: '#38BDF8',
    },
    filledDigit: {
        backgroundColor: '#162033',
        borderColor: '#A78BFA',
    },
    digitText: {
        color: 'rgba(226, 232, 240, 0.35)',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    filledText: {
        color: '#C4B5FD',
    },
});
