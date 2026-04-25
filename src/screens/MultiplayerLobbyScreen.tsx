import React from 'react';
import { ActivityIndicator, Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedBackdrop } from '../../components/AnimatedBackdrop';

interface Props {
    colorAnim: Animated.Value;
    devices: any[];
    fadeAnim: Animated.Value;
    isSearching: boolean;
    onBack: () => void;
    onConnect: (id: string) => void;
    onSearch: () => void;
}

export const MultiplayerLobbyScreen: React.FC<Props> = ({
    colorAnim,
    devices,
    fadeAnim,
    isSearching,
    onBack,
    onConnect,
    onSearch,
}) => (
    <View style={styles.container}>
        <AnimatedBackdrop colorAnim={colorAnim} lineCount={14} />

        <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#E2E8F0" />
        </TouchableOpacity>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <Text style={[styles.title, styles.neonText]}>Eşli Oyun</Text>
            <Text style={styles.subtitle}>Bluetooth ile Bağlan</Text>

            <TouchableOpacity
                style={styles.searchButton}
                onPress={onSearch}
                disabled={isSearching}
            >
                <Ionicons name="bluetooth" size={24} color="#38BDF8" />
                {isSearching ? (
                    <ActivityIndicator color="#38BDF8" />
                ) : (
                    <Text style={styles.searchButtonText}>Cihaz Ara</Text>
                )}
                <View style={styles.buttonGlow} />
            </TouchableOpacity>

            <FlatList
                data={devices}
                style={styles.deviceList}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    !isSearching ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="bluetooth-outline" size={40} color="#38BDF8" style={{ opacity: 0.5 }} />
                            <Text style={styles.emptyText}>Cihaz aramak için butona tıkla</Text>
                        </View>
                    ) : null
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.deviceItem}
                        onPress={() => onConnect(item.id)}
                    >
                        <Ionicons name="phone-portrait" size={24} color="#38BDF8" />
                        <Text style={styles.deviceName}>{item.name || 'Bilinmeyen Cihaz'}</Text>
                        <View style={styles.deviceGlow} />
                    </TouchableOpacity>
                )}
            />
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 0,
        padding: 15,
        zIndex: 100,
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
    searchButton: {
        backgroundColor: '#162033',
        borderWidth: 3,
        borderColor: '#38BDF8',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
        minWidth: 180,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 2,
    },
    searchButtonText: {
        color: '#E2E8F0',
        fontSize: 18,
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
    deviceList: {
        width: '100%',
    },
    deviceItem: {
        backgroundColor: '#162033',
        borderWidth: 3,
        borderColor: '#38BDF8',
        padding: 18,
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 2,
    },
    deviceName: {
        color: '#E2E8F0',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    deviceGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        borderRadius: 8,
        top: 0,
        left: 0,
    },
    emptyText: {
        color: '#94A3B8',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
        letterSpacing: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
});
