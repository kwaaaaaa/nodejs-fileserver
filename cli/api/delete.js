import chalk from 'chalk';
import request from 'request';

export async function deleteFile(endpoint, name) {
        
  request.delete({
    url: endpoint,
    formData: {
      fileName: name,
    },
  }, (error, response, body) => {
    const resp = JSON.parse(body)
    if (resp.status) {
      console.log(chalk.magenta(resp.message))
    } else {
      console.log(chalk.redBright('ERROR, Unable to remove file'));
      console.log(chalk.redBright(resp.error));
    }
  })
}