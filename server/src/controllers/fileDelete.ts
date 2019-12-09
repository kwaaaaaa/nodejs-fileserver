import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import ErrorMessage from '../models/ErrorMessage';
import FileStorage from '../services/FileStorage';

export default async (req: Request, res: Response) => {
  const body = req.body;
  if (!body || !body.fileName) {
    return res.status(500).send(new ErrorMessage('No file specified'));
  }
  if (typeof body.fileName !== 'string') {
    return res.status(500).send(new ErrorMessage('fileName must be a string'));
  }

  try {
    const storageService = new FileStorage();
    await storageService.deleteFile(body.fileName)
      .then((resp) => {
        return res.send(resp);
      })
      .catch((err) => {
        logger.error(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    logger.error('Unable to delete file', err);
    res.status(500).send(
      new ErrorMessage('Unable to scan directory. Check server logs.')
    );
  }
};
