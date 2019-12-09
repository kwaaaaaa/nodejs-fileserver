import chalk from 'chalk';
import minimist from 'minimist';
import { localDelete } from './fs/localDelete';
import { localUpload } from './fs/localUpload';
import { localList } from './fs/localList';
import { deleteFile } from './api/delete';
import { upload } from './api/upload';
import { list } from './api/list';

// set up variables
const storagePath = process.env.STORAGE_PATH || '../uploads/'
const fullPath = storagePath.substring(0,2) === '..'
    ? `${__dirname}${storagePath.substring(2)}`
    : storagePath

const port = process.env.PORT || 5555
const server = process.env.NODE_ENV === 'production'
  ? process.env.SERVER_ADDRESS
  : `http://localhost:${port}`
const endpoint = `${server}/files`

export async function cli(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args[0] || 'help';

  if (args.help || args.h) {
    cmd = 'help';
  } else if (args.list || args.l) {
    cmd = 'list'
  } else if (args.upload || args.u) {
    cmd = 'upload'
  } else if (args.delete || args.d) {
    cmd = 'delete'
  } else if (args.local_list) {
    cmd = 'local_list'
  } else if (args.local_upload) {
    cmd = 'local_upload'
  } else if (args.local_delete) {
    cmd = 'local_delete'
  }

  switch (cmd) {
    case 'help':
      const serverMessage = `Your file server is located at: ${fullPath}`
      console.log(`👋 ${chalk.magentaBright(serverMessage)}`)
      if (!process.env.STORAGE_PATH) {
        console.log(chalk.magentaBright("You haven't so we're using the default path. You can set it by setting the env STORAGE_PATH"))
      }
      console.log(chalk.cyanBright('Commands:'))
      console.log(chalk.cyanBright('--list'))
      console.log(chalk.cyanBright('--upload --path /pathtoyourfile/:'))
      console.log(chalk.cyanBright('--delete --name file-name'))
      console.log(chalk.cyanBright('--local_list'))
      console.log(chalk.cyanBright('--local_upload --path /pathtoyourfile/:'))
      console.log(chalk.cyanBright('--local_delete --name file-name'))
      break;

    case 'list':
      console.log(chalk.magentaBright(`Contacting ${server}`))
      list(endpoint)
      break;
    
    case 'upload':
      if (!args.path) {
        console.log(chalk.redBright('ERROR, please define a --path for the file you want to upload'));
        return
      }
      console.log(`Upload file from ${chalk.yellow(args.path)}`);
      console.log(chalk.magentaBright(`Contacting ${server}`))
      upload(endpoint, args.path)
      break;
  
    case 'delete':
      if (!args.name) {
        console.log(chalk.redBright('ERROR, please define a --name for the file you want to remove'));
        return
      }
      console.log(`Removing file ${chalk.yellow(args.name)}`);
      console.log(chalk.magentaBright(`Contacting ${server}`))
      deleteFile(endpoint, args.name)
      break;

    case 'local_list':
      localList(storagePath)
      break;

    case 'local_upload':
      if (!args.path) {
        console.log(chalk.redBright('ERROR, please define a --path for the file you want to upload'));
        return
      }
      console.log(`Copying file from ${chalk.yellow(args.path)}`);
      localUpload(storagePath, args.path)
      break;

    case 'local_delete':
      if (!args.name) {
        console.log(chalk.redBright('ERROR, please define a --name for the file you want to remove'));
        return
      }
      console.log(`Removing file ${chalk.yellow(args.name)}`);
      localDelete(storagePath, args.name)
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}