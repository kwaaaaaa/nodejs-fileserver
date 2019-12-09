import chalk from 'chalk';
import fs from 'fs';

export async function localList(storagePath) {
  const scanDirectory = (err, files) => {
    if (err) {
      console.log('Unable to scan directory', err);
    }
    console.log(chalk.magentaBright(`Found ${files.length} Files`))
    files.map(file => {
      console.log(chalk.magenta(file))
    })
  };
  fs.readdir(
    storagePath,
    scanDirectory,
  );
}