"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSignal = exports.isValidDeviceNumber = void 0;
const TransmitCodes_1 = require("../constants/TransmitCodes");
const validDeviceNumbers = Object.keys(TransmitCodes_1.TransmitCodes).map(n => parseInt(n));
const validSignals = ['on', 'off'];
function isValidDeviceNumber(deviceNumber) {
    return validDeviceNumbers.includes(deviceNumber);
}
exports.isValidDeviceNumber = isValidDeviceNumber;
function isValidSignal(signal) {
    return validSignals.includes(signal);
}
exports.isValidSignal = isValidSignal;
