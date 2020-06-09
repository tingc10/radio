import express from 'express';
import { isValidDeviceNumber, isValidSignal } from './utils/code-validation';
import { transmitSignalToDevice } from './utils/transmit-codes';

interface DeviceTimers {
  [key: number]: NodeJS.Timeout;
}

const app = express();
const PORT = process.env.PORT || 3000;
const deviceTimers: DeviceTimers = {};

function cancelExistingTimersForDevice(deviceNumber: number) {
  if (!deviceTimers[deviceNumber]) return;
  console.log(`Cancelled timer for device number ${deviceNumber}`);
  clearTimeout(deviceTimers[deviceNumber]);
  delete deviceTimers[deviceNumber];
}

function setNewTimerForDevice(deviceNumber: number, timeout: number) {
  cancelExistingTimersForDevice(deviceNumber);
  console.log(`Setting a new timer for device ${deviceNumber}`);
  deviceTimers[deviceNumber] = setTimeout(() => {
    transmitSignalToDevice(deviceNumber, 'off');
  }, timeout);
}

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/transmit/', (req, res) => {
  const { query } = req;
  const { deviceNumber, signal, timeout } = query;

  if (!isValidDeviceNumber(deviceNumber)) {
    res.status(400).send({
      message: 'Invalid Param: `deviceNumber` must be of value 1-3',
    });
  } else if (!isValidSignal(signal)) {
    res.status(400).send({
      message: 'Invalid Param: `signal` must be of value on/off',
    });
  } else {
    transmitSignalToDevice(deviceNumber, signal);
    if (signal === 'off') {
      cancelExistingTimersForDevice(deviceNumber);
    }

    // Check if there's a timeout param, if so, set a new timer to shutdown the device
    if (timeout && typeof timeout === 'string') {
      const timeToShutdown = parseInt(timeout);

      if (!isNaN(timeToShutdown) && timeToShutdown > 0) {
        const toHours = timeToShutdown / 3600000;
        setNewTimerForDevice(deviceNumber, timeToShutdown);
        res.send({
          message: `Device ${deviceNumber} turned ${signal} and will shut off in ${toHours.toFixed(
            1,
          )} hours`,
        });
      }
    } else {
      res.send({
        message: `Device ${deviceNumber} turned ${signal}`,
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Radio transmit API listening on port ${PORT}`);
});
