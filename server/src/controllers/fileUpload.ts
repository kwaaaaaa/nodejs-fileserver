import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import logger from '../middlewares/logger';
import ErrorMessage from '../models/ErrorMessage';
import SuccessMessage from '../models/SuccessMessage';
import FileStorage from '../services/FileStorage';

export default async (req: Request, res: Response) => {
  console.log('files tring to upload', req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send(new ErrorMessage('No files were uploaded because request is of the wrong type.'));
  }

  if (!Object.keys(req.files) || Object.keys(req.files).length > 1) {
    return res.status(400).send(new ErrorMessage('Invalid request. Request should include only a list of files.'));
  }

  // setup
  const storageService = new FileStorage();
  const key = Object.keys(req.files)[0];
  const fileObj: any = req.files[key];
  const filesToUpload: UploadedFile[] = Array.isArray(fileObj)
    ? Array.from(fileObj)
    : [ fileObj ];

  // check if file already exists
  const dupeError = await storageService.listFiles()
    .then((resp: SuccessMessage) => {
      for (const file of resp.data) {
        if (filesToUpload.find((f) => f.name === file.toString())) {
          return 'Found existing record';
        }
      }
      return '';
    })
    .catch((err) => {
      logger.error('Unable to check for duplicate files', err);
      res.status(400).send(err);
      return 'Unable to check for duplicate files';
    });
  if (dupeError) {
    logger.error(dupeError);
    return res.status(400).send(new ErrorMessage(dupeError));
  }

  // try to upload file
  try {
    await storageService.addFiles(filesToUpload)
      .then((resp) => {
        return res.send(resp);
      })
      .catch((err) => {
        logger.error(err);
        return res.status(400).send(err);
      });

  } catch (err) {
    logger.error('Unable to upload file', err);
    res.status(500).send(
      new ErrorMessage('Unable to upload file. Check server logs.')
    );
  }
};
