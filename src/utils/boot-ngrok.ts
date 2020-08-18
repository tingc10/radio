import { exec } from 'child_process';

export function bootNgrok(port: number | string) {
  console.log(`Booting Ngrok on ${port}`)
  exec(
    `ngrok http ${port}`,
    function (error, stdout, _) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
      console.log(stdout);
    },
  );
}
