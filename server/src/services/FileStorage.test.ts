import 'jest';
import FileStorage from './FileStorage';
import SuccessMessage from '../models/SuccessMessage';
import ErrorMessage from '../models/ErrorMessage';

describe('services/FileStorage', () => {

  it('0. List uploaded files returns an array', async () => {
    const storageService = new FileStorage();
    const response = await storageService.listFiles();
    const success = response as SuccessMessage;

    expect(Array.isArray(success.data)).toBe(true);
  });

  it('1. Deleting file that doesnt exist throws error', async () => {
    const storageService = new FileStorage();
    await storageService.deleteFile('d6531411-c985-4ddc-a711-237d3eab9156')
      .then(resp => {
        expect(resp).toBe('Error message should have been thrown');
      })
      .catch(err => {
        const errorMessage: ErrorMessage = err;
        expect(errorMessage.error.toString()).toMatch('no such file or dir');
      });
  });
});