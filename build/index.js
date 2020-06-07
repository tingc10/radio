"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var TransmitCodes = {
    1: {
        on: 1398067,
        off: 1398076
    },
    2: {
        on: 1398211,
        off: 1398220
    },
    3: {
        on: 1398531,
        off: 1398540
    }
};
var validDeviceNumbers = Object.keys(TransmitCodes).map(function (n) { return parseInt(n); });
var validSignals = ['on', 'off'];
var PULSE_LENGTH = 176;
var TRANSMIT_GPIO = 4;
function isValidDeviceNumber(deviceNumber) {
    return validDeviceNumbers.includes(deviceNumber);
}
function isValidSignal(signal) {
    return validSignals.includes(signal);
}
function transmitSignalToDevice(deviceNumber, signal) {
    child_process_1.exec("python3 send.py -g " + TRANSMIT_GPIO + " -p " + PULSE_LENGTH + " " + TransmitCodes[deviceNumber][signal], function (error, _, stderror) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log(stderror);
    });
}
var args = process.argv.slice(2);
if (args.length !== 2) {
    console.log('Invalid number of params, specify device number (1-3) and signal (on/off)');
    process.exit(1);
}
var deviceNumber = parseInt(args[0]);
var signal = args[1];
if (!isValidDeviceNumber(deviceNumber)) {
    console.log('1st param should be a device number (1-3)');
    process.exit(1);
}
if (!isValidSignal(signal)) {
    console.log('2nd param should be a signal (on/off)');
    process.exit(1);
}
transmitSignalToDevice(deviceNumber, signal);
