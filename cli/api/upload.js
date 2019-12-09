import chalk from 'chalk';
import fs from 'fs';
import request from 'request';

export async function upload(endpoint, path) {
  const paths = path.split('/')
  const fname = paths[paths.length-1]
  const formData = {
    toUpload: {
      value: fs.createReadStream(path),
      options: {
        filename: fname
      }
    }
  };
  const options = {
    url: endpoint,
    method: 'POST',
    formData: formData
  }
  request(options, (err, response, body) => {
    const resp = JSON.parse(body)
    if (err || !resp.status) {
      console.log(chalk.redBright('ERROR, Unable to upload file'));
      console.log(chalk.redBright(resp.error));
    } else {
      console.log(chalk.magenta(resp.message))
    }
  })
}