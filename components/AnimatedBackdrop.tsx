import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface Props {
    colorAnim: Animated.Value;
    lineCount: number;
}

export const AnimatedBackdrop: React.FC<Props> = ({ colorAnim, lineCount }) => {
    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#060B16', '#101A2E', '#060B16'],
    });
    const signalDriftRight = colorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-36, 42, -36],
    });
    const signalDriftLeft = colorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [44, -38, 44],
    });

    return (
        <>
            <Animated.View style={[styles.animatedBackground, { backgroundColor }]} />
            <View style={styles.signalLines}>
                {[...Array(lineCount)].map((_, i) => (
                    <Animated.View
                        key={i}
                        style={[
                            styles.signalLine,
                            i % 3 === 0 && styles.signalLineShort,
                            i % 3 === 1 && styles.signalLineOffset,
                            {
                                transform: [{
                                    translateX: i % 2 === 0 ? signalDriftRight : signalDriftLeft,
                                }],
                            },
                        ]}
                    />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    animatedBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#060B16',
    },
    signalLines: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 28,
        paddingBottom: 28,
    },
    signalLine: {
        width: '82%',
        height: 2,
        backgroundColor: '#38BDF8',
        opacity: 0.1,
        alignSelf: 'flex-start',
    },
    signalLineShort: {
        width: '38%',
        backgroundColor: '#A78BFA',
        opacity: 0.16,
    },
    signalLineOffset: {
        width: '58%',
        alignSelf: 'flex-end',
        backgroundColor: '#4ADE80',
        opacity: 0.12,
    },
});
