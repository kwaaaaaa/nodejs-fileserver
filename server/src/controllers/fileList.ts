import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import ErrorMessage from '../models/ErrorMessage';
import FileStorage from '../services/FileStorage';

export default async (req: Request, res: Response) => {

  const storageService = new FileStorage();

  try {

    await storageService.listFiles()
      .then((resp) => {
        return res.send(resp);
      })
      .catch((err) => {
        logger.error(err);
        return res.status(400).send(err);
      });

  } catch (err) {
    logger.error('Unable to scan directory', err);
    return new ErrorMessage('Unable to scan directory. Check server logs.');
  }
};
