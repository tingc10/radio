import { isValidDeviceNumber, isValidSignal } from "./utils/code-validation";
import { transmitSignalToDevice } from "./utils/transmit-codes";

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Invalid number of params, specify device number (1-3) and signal (on/off)')
  process.exit(1)
}

const deviceNumber = parseInt(args[0])
const signal = args[1]

if (!isValidDeviceNumber(deviceNumber)) {
  console.log('1st param should be a device number (1-3)')
  process.exit(1)
}

if (!isValidSignal(signal)) {
  console.log('2nd param should be a signal (on/off)')
  process.exit(1)
}

transmitSignalToDevice(deviceNumber, signal)
