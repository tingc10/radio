import express from 'express'
import { isValidDeviceNumber, isValidSignal } from './utils/code-validation';
import { transmitSignalToDevice } from './utils/transmit-codes';

const app = express()
const PORT = process.env.PORT || 3000

app.get('/transmit/', (req, res) => {
  const { query } = req;
  const { deviceNumber, signal } = query;

  if (!isValidDeviceNumber(deviceNumber)) {
    res.status(400).send({
      message: 'Invalid Param: `deviceNumber` must be of value 1-3'
    });
  } else if (!isValidSignal(signal)) {
    res.status(400).send({
      message: 'Invalid Param: `signal` must be of value on/off'
    });
  } else {
    transmitSignalToDevice(deviceNumber, signal);
    res.send({
      message: `Device ${deviceNumber} turned ${signal}`
    })
  }
})

app.listen(PORT, () => {
  console.log(`Radio transmit API listening on port ${PORT}`)
})
