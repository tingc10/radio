import { CronJob } from 'cron';
import { transmitSignalToDevice } from './transmit-codes';

export const turnOnLightsJob = () => {
  console.log('Initializing turn on lights job');
  // Run turn on job at 9am every day
  new CronJob(
    '* 9 * * *',
    () => {
      console.log('Turning on grow lights');
      transmitSignalToDevice(1, 'on');
    },
    () => {
      console.log('Turn on light job execution stopped or completed');
    },
    true,
    'America/New_York',
  );
};

export const turnOffLightsJob = () => {
  console.log('Initializing turn off lights job');
  // Run turn off job at 1am every day
  new CronJob(
    '* 1 * * *',
    () => {
      console.log('Turning off grow lights');
      transmitSignalToDevice(1, 'off');
    },
    () => {
      console.log('Turn off light job execution stopped or completed');
    },
    true,
    'America/New_York',
  );
};
