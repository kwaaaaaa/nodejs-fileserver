import { UploadedFile } from 'express-fileupload';
import IMessage from '../models/IMessage';

type ListFilesFunction = () => Promise<IMessage>;
type DeleteFileFunction = (name: string) => Promise<IMessage>;
type AddFilesFunction = (filesToUpload: UploadedFile[]) => Promise<IMessage>;

export default interface IStorage {
  fileNames: string[];
  listFiles: ListFilesFunction;
  deleteFile: DeleteFileFunction;
  addFiles: AddFilesFunction;
}
