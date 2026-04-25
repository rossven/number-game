import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Guess } from '../types';

interface Props {
    guess: Guess;
    isLatest: boolean;
    isEasyMode: boolean;
}

export const GuessDisplay: React.FC<Props> = ({ guess, isLatest, isEasyMode }) => {
    const resultDots = guess.result.filter(r => r !== 'none');
    const revealAnim = useRef(new Animated.Value(isLatest ? 0 : 1)).current;
    const styleForResult = {
        green: {
            box: styles.green,
            text: styles.greenText,
            wrapper: styles.greenWrapper,
            dot: styles.greenDot,
        },
        yellow: {
            box: styles.yellow,
            text: styles.yellowText,
            wrapper: styles.yellowWrapper,
            dot: styles.yellowDot,
        },
        none: {
            box: styles.none,
            text: styles.noneText,
            wrapper: styles.noneWrapper,
            dot: null,
        },
    };

    useEffect(() => {
        if (!isLatest) {
            revealAnim.setValue(1);
            return;
        }

        revealAnim.setValue(0);
        Animated.timing(revealAnim, {
            toValue: 1,
            duration: 520,
            useNativeDriver: true,
        }).start();
    }, [guess.number, isLatest]);

    const revealStyle = {
        opacity: revealAnim,
        transform: [
            {
                translateY: revealAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-12, 0],
                }),
            },
            {
                scale: revealAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.94, 1],
                }),
            },
        ],
    };

    return (
        <Animated.View style={[
            styles.container,
            !isLatest && styles.smaller,
            isLatest && styles.latestGuess,
            revealStyle
        ]}>
            {isEasyMode ? (
                guess.number.split('').map((digit, index) => (
                    <View
                        key={index}
                        style={[
                            styles.doubleBorderWrapper,
                            styleForResult[guess.result[index]].wrapper
                        ]}
                    >
                        <View style={[
                            styles.digitBox,
                            styleForResult[guess.result[index]].box,
                            isLatest && styles.latestDigit
                        ]}>
                            <Text style={[
                                styles.digitText,
                                styleForResult[guess.result[index]].text
                            ]}>{digit}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <View style={styles.hardModeRow}>
                    <View style={styles.numberContainer}>
                        {guess.number.split('').map((digit, index) => (
                            <View key={index} style={[styles.doubleBorderWrapper, styles.neutralWrapper]}>
                                <View style={[styles.digitBox, styles.neutralDigit]}>
                                    <Text style={styles.digitText}>{digit}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.dotsWrapper}>
                        {resultDots.map((result, index) => (
                            <View
                                key={index}
                                style={[styles.dot, styleForResult[result].dot]}
                            />
                        ))}
                    </View>
                </View>
            )}
            {isLatest && <Animated.View style={[styles.scanBeam, { opacity: revealAnim }]} />}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 2,
        gap: 10,
    },
    hardModeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    numberContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    dotsWrapper: {
        position: 'absolute',
        right: -60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    smaller: {
        transform: [{ scale: 0.8 }],
        opacity: 0.7,
    },
    doubleBorderWrapper: {
        padding: 2,
        backgroundColor: '#38BDF8',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 0,
        elevation: 1,
    },
    digitBox: {
        width: 50,
        height: 55,
        borderWidth: 2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#162033',
        borderColor: '#38BDF8',
    },
    latestDigit: {
        width: 55,
        height: 60,
    },
    digitText: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
        color: '#E2E8F0',
    },
    green: {
        backgroundColor: '#162033',
        borderColor: '#4ADE80',
    },
    greenText: {
        color: '#EAFBF1',
    },
    greenWrapper: {
        backgroundColor: '#4ADE80',
    },
    yellow: {
        backgroundColor: '#162033',
        borderColor: '#FBBF24',
    },
    yellowText: {
        color: '#FBBF24',
    },
    yellowWrapper: {
        backgroundColor: '#FBBF24',
    },
    none: {
        backgroundColor: '#0F172A',
        opacity: 0.6,
    },
    noneText: {
        color: '#64748B',
    },
    noneWrapper: {
        backgroundColor: '#334155',
    },
    neutral: {
        color: '#E2E8F0',
    },
    neutralDigit: {
        backgroundColor: '#162033',
        borderColor: '#38BDF8',
    },
    neutralWrapper: {
        backgroundColor: '#38BDF8',
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    greenDot: {
        backgroundColor: '#4ADE80',
    },
    yellowDot: {
        backgroundColor: '#FBBF24',
    },
    latestGuess: {
        marginBottom: 20,
    },
    scanBeam: {
        position: 'absolute',
        bottom: -3,
        width: 170,
        height: 2,
        borderRadius: 1,
        backgroundColor: '#38BDF8',
        opacity: 0.35,
    },
});
