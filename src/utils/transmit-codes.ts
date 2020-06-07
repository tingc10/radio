import { exec } from 'child_process';
import { TransmitCodes } from '../constants/TransmitCodes';

const PULSE_LENGTH = 176;
const TRANSMIT_GPIO = 4;

export function transmitSignalToDevice(deviceNumber: number, signal: string) {
    exec(`python3 send.py -g ${TRANSMIT_GPIO} -p ${PULSE_LENGTH} ${TransmitCodes[deviceNumber][signal]}`, function (
        error,
        _,
        stderror,
    ) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log(stderror);
    });
}
