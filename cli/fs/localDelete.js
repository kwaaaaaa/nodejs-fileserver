import chalk from 'chalk';
import fs from 'fs';

export async function localDelete(storagePath, name) {
  try {
    const filePath = `${storagePath}${name}`
    fs.unlinkSync(filePath);
    console.log(chalk.magentaBright(`Successfully removed ${name}`));
  } catch (err) {
    console.log(chalk.redBright('ERROR, Unable to delete file'));
    console.log(chalk.redBright(err));
  }
}