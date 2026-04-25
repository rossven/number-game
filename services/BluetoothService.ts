import { Platform } from 'react-native';

let BluetoothSerial: any = null;

if (Platform.OS !== 'web') {
    BluetoothSerial = require('react-native-bluetooth-serial-next');
} else {
    BluetoothSerial = {
        on: () => {},
        requestEnable: async () => {},
        disconnect: async () => {},
        write: async () => {},
        list: async () => [],
        discoverUnpairedDevices: async () => [],
        connect: async () => {},
    };
}

type MessageHandler = (data: string) => void;

class BluetoothService {
    private static instance: BluetoothService;
    private messageHandlers: MessageHandler[] = [];
    private isConnected: boolean = false;

    private constructor() {
        if (Platform.OS !== 'web') {
            this.setupListeners();
        }
    }

    static getInstance(): BluetoothService {
        if (!BluetoothService.instance) {
            BluetoothService.instance = new BluetoothService();
        }
        return BluetoothService.instance;
    }

    private setupListeners() {
        BluetoothSerial.on('read', (data: any) => {
            const message = data.data;
            this.messageHandlers.forEach(handler => handler(message));
        });

        BluetoothSerial.on('connectionLost', () => {
            this.isConnected = false;
            console.log('Bluetooth bağlantısı koptu');
        });

        BluetoothSerial.on('connected', () => {
            this.isConnected = true;
            console.log('Bluetooth bağlandı');
        });
    }

    async requestEnable(): Promise<void> {
        if (Platform.OS === 'web') {
            return Promise.resolve();
        }
        try {
            await BluetoothSerial.requestEnable();
        } catch (error) {
            console.error('Bluetooth enabled error:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (Platform.OS === 'web') {
            return Promise.resolve();
        }
        try {
            await BluetoothSerial.disconnect();
            this.isConnected = false;
        } catch (error) {
            console.error('Bluetooth disconnect error:', error);
            throw error;
        }
    }

    addListener(event: 'read', handler: MessageHandler) {
        if (event === 'read') {
            this.messageHandlers.push(handler);
        }
        return {
            remove: () => {
                const index = this.messageHandlers.indexOf(handler);
                if (index > -1) {
                    this.messageHandlers.splice(index, 1);
                }
            }
        };
    }

    async write(message: string): Promise<void> {
        if (Platform.OS === 'web') {
            return Promise.resolve();
        }
        try {
            if (!this.isConnected) {
                throw new Error('Bluetooth bağlantısı yok');
            }
            await BluetoothSerial.write(message + '\n');
        } catch (error) {
            console.error('Bluetooth write error:', error);
            throw error;
        }
    }

    async list(): Promise<any[]> {
        if (Platform.OS === 'web') {
            return [];
        }
        try {
            return await BluetoothSerial.list();
        } catch (error) {
            console.error('Bluetooth list error:', error);
            throw error;
        }
    }

    async discoverUnpairedDevices(): Promise<any[]> {
        if (Platform.OS === 'web') {
            return [];
        }
        try {
            return await BluetoothSerial.discoverUnpairedDevices();
        } catch (error) {
            console.error('Bluetooth discover error:', error);
            throw error;
        }
    }

    async connect(deviceId: string): Promise<void> {
        if (Platform.OS === 'web') {
            return Promise.resolve();
        }
        try {
            await BluetoothSerial.connect(deviceId);
            this.isConnected = true;
        } catch (error) {
            console.error('Bluetooth connect error:', error);
            throw error;
        }
    }

    isConnectedToDevice(): boolean {
        return this.isConnected;
    }
}

export default BluetoothService;
