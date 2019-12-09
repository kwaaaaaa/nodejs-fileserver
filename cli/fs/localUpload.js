import chalk from 'chalk';
import fs from 'fs';

export async function localUpload(storagePath, path) {
  const filePaths = path.split('/')
  const name = filePaths[filePaths.length-1]
  const destPath = `${storagePath}${name}`
  console.log(destPath)
  try {
    let readStream = fs.createReadStream(path);
    readStream.once('error', (err) => {
      console.log(err);
      return
    });
    readStream.once('end', () => {
      console.log(chalk.magentaBright(`Successfully added ${name}`));
    });
    readStream.pipe(fs.createWriteStream(destPath));
  } catch (err) {
    console.log(chalk.redBright('ERROR, Unable to upload file'));
    console.log(chalk.redBright(err));
  }
}