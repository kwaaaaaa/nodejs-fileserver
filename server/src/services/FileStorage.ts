import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import ErrorMessage from '../models/ErrorMessage';
import IMessage from '../models/IMessage';
import SuccessMessage from '../models/SuccessMessage';
import IStorage from './IStorage';

export default class FileStorage implements IStorage {
  public fileNames: string[];
  public storagePath = process.env.STORAGE_PATH || '../uploads/';

  public listFiles = () => {
    const getDirsAsPromise = async (storagePath: string): Promise<IMessage> =>
      new Promise((resolve, reject) => {
        fs.readdir(
          storagePath,
          (err: any, files: any) => {
            if (err) {
              reject(new ErrorMessage('Unable to scan directory. Check server logs.'));
            }
            return resolve(new SuccessMessage('ok', files));
          },
        );
      }
    );

    return getDirsAsPromise(this.storagePath);
  }

  public deleteFile = (name: string) => {
    const deleteAsPromise = async (storagePath: string, filePath: string): Promise<IMessage> =>
      new Promise((resolve, reject) => {
        fs.unlinkSync(filePath);
        return resolve(new SuccessMessage('ok'));
      }
    );

    const filePath = `${this.storagePath}${name}`;
    return deleteAsPromise(this.storagePath, filePath);
  }

  public addFiles = (filesToUpload: UploadedFile[]) => {

    const addFilesAsPromise = async (storagePath: string, filesToUpload: UploadedFile[]): Promise<IMessage> =>
      new Promise((resolve, reject) => {
        const data: object[] = [];

        // loop through all files
        filesToUpload.map((file) => {
          file.mv(`${storagePath}${file.name}`);
          data.push({
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
          });
        });

        resolve(new SuccessMessage(
          `${data.length} Files are uploaded`,
          data,
        ));
    });

    return addFilesAsPromise(this.storagePath, filesToUpload);
  }
}
