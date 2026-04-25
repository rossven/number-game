import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { NumberInput } from './NumberInput';
import { generateRandomNumber } from '../utils/numberGenerator';

interface Props {
    visible: boolean;
    onClose: () => void;
    onNumberSet: (number: string) => void;
}

export const NumberSetModal: React.FC<Props> = ({ visible, onClose, onNumberSet }) => {
    const [number, setNumber] = useState('');

    const handleNumberClick = (num: number) => {
        if (number.length < 4 && !number.includes(num.toString())) {
            if (number.length === 0 && num === 0) return;
            setNumber(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setNumber(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (number.length === 4) {
            onNumberSet(number);
            setNumber('');
            onClose();
        }
    };

    const handleRandom = () => {
        const randomNumber = generateRandomNumber();
        onNumberSet(randomNumber);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.doubleBorderWrapper}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Sayı Belirle</Text>
                        <Text style={styles.subtitle}>Rakibin tahmin edeceği 4 basamaklı sayıyı belirle</Text>

                        <TouchableOpacity
                            style={styles.randomButtonWrapper}
                            onPress={handleRandom}
                        >
                            <View style={styles.randomButton}>
                                <Text style={styles.randomButtonText}>Rastgele Sayı</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.orText}>veya</Text>

                        <NumberInput
                            currentGuess={number}
                            onNumberClick={handleNumberClick}
                            onDelete={handleDelete}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(2, 6, 23, 0.78)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    doubleBorderWrapper: {
        padding: 3,
        backgroundColor: '#38BDF8',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 3,
    },
    modalContent: {
        backgroundColor: '#0B1020',
        padding: 20,
        borderRadius: 8,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        color: '#E2E8F0',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    subtitle: {
        color: '#94A3B8',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    randomButtonWrapper: {
        padding: 2,
        backgroundColor: '#A78BFA',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 2,
        marginBottom: 10,
    },
    randomButton: {
        backgroundColor: '#162033',
        borderWidth: 1,
        borderColor: '#A78BFA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    randomButtonText: {
        color: '#EDE9FE',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Avenir Next Condensed, Arial Rounded MT Bold, Trebuchet MS, sans-serif',
    },
    orText: {
        color: '#94A3B8',
        fontSize: 16,
        marginVertical: 10,
    },
});
