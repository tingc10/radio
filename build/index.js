"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_validation_1 = require("./utils/code-validation");
const transmit_codes_1 = require("./utils/transmit-codes");
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.log('Invalid number of params, specify device number (1-3) and signal (on/off)');
    process.exit(1);
}
const deviceNumber = parseInt(args[0]);
const signal = args[1];
if (!code_validation_1.isValidDeviceNumber(deviceNumber)) {
    console.log('1st param should be a device number (1-3)');
    process.exit(1);
}
if (!code_validation_1.isValidSignal(signal)) {
    console.log('2nd param should be a signal (on/off)');
    process.exit(1);
}
transmit_codes_1.transmitSignalToDevice(deviceNumber, signal);
