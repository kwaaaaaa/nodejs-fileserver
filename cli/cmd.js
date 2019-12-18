const { spawn } = require('child_process');
const concat = require('concat-stream');

function createProcess(args = []) {
  return spawn('fs-store', args);
}

function execute(args = []) {
  const childProcess = createProcess(args);
  childProcess.stdin.setEncoding('utf-8');
  const promise = new Promise((resolve, reject) => {
    childProcess.stderr.once('data', err => {
      reject(err.toString());
    });
    childProcess.on('error', reject);
    childProcess.stdout.pipe(
      concat(result => {
        resolve(result.toString());
      })
    );
  });
  return promise;
}

module.exports = { execute };