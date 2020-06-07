import { TransmitCodes } from '../constants/TransmitCodes';

const validDeviceNumbers = Object.keys(TransmitCodes).map((n) => parseInt(n));
const validSignals = ['on', 'off'];

export function isValidDeviceNumber(input: any): input is number {
  const deviceNumber = parseInt(input)

    return !isNaN(deviceNumber) && validDeviceNumbers.includes(deviceNumber);
}

export function isValidSignal(signal: any): signal is string {
    return typeof signal === 'string' && validSignals.includes(signal);
}
