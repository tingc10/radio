"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transmitSignalToDevice = void 0;
const child_process_1 = require("child_process");
const TransmitCodes_1 = require("../constants/TransmitCodes");
const PULSE_LENGTH = 176;
const TRANSMIT_GPIO = 4;
function transmitSignalToDevice(deviceNumber, signal) {
    child_process_1.exec(`python3 send.py -g ${TRANSMIT_GPIO} -p ${PULSE_LENGTH} ${TransmitCodes_1.TransmitCodes[deviceNumber][signal]}`, function (error, _, stderror) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log(stderror);
    });
}
exports.transmitSignalToDevice = transmitSignalToDevice;
