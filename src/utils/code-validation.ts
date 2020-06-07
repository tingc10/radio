import { TransmitCodes } from '../constants/TransmitCodes';

const validDeviceNumbers = Object.keys(TransmitCodes).map((n) => parseInt(n));
const validSignals = ['on', 'off'];

export function isValidDeviceNumber(deviceNumber: number) {
    return validDeviceNumbers.includes(deviceNumber);
}

export function isValidSignal(signal: string) {
    return validSignals.includes(signal);
}
