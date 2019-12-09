import chalk from 'chalk';
import request from 'request';

export async function list(endpoint) {
  request.get({
    url: endpoint,
  }, (error, response, body) => {
    if (error) {
      console.error(chalk.redBright('Failed to list files. Is the server up?'))
    } else {
      const resp = JSON.parse(body)
      const data = resp.data
      console.log(chalk.magentaBright(`Found ${data.length} Files`))
      data.map(file => {
        console.log(chalk.magenta(file))
      })
    }
  })
}