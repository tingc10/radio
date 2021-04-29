import { CronJob } from 'cron';
import { transmitSignalToDevice } from './transmit-codes';

export const turnOnLightsJob = () => {
  console.log('Initializing turn on lights job');
  // Run turn on job at 8am at every quarter hour every day
  new CronJob(
    '*/15 8 * * *',
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
  // Run turn off job at 11pm at every quarter hour every day
  new CronJob(
    '*/15 23 * * *',
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
