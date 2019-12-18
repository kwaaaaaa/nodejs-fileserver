import React from 'react';
import { render, wait, queryByText, queryByTestId, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileUploadPage from './FileUploadPage';
import { FileServerProvider } from '../contexts/FileServerContext'
import * as service from '../services/FileServerService'

// ToDo: Mock the api return to return test file in order to test page rendering

describe('<FileUploadPage/>', () => {
  it('Page calls API on load and Displays 0 Files: until load', async () => {
    const spy = jest.spyOn(service, 'getFileList')
    const tree = (
      <FileServerProvider>
        <FileUploadPage />
      </FileServerProvider>
    )
    const { getByText } = render(tree)
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getByText('0 Files:')).toBeInTheDocument()
  
    // ToDo: Mock the api return to return test
    await wait(() => {
      expect(getByText('test')).toBeInTheDocument()
    });
  });

  it('Prompts user when delete', async () => {
    const tree = (
      <FileServerProvider>
        <FileUploadPage />
      </FileServerProvider>
    )
    const { container, getByText, getByTestId } = render(tree)

    // delete icon shouldnt be present when page first loaded
    const deleteIcon = queryByTestId(container, 'deleteIcon')
    expect(deleteIcon).toBeNull()
    
    // cancel button shouldnt be present
    const cancelButton = queryByText(container, 'Cancel')
    expect(cancelButton).toBeNull()

    // delete icon becomes present and clicking it will open prompt
    await wait(() => {
      expect(getByTestId('deleteIcon')).toBeInTheDocument()
    });

    // clicking on delete icon shows a cancel button
    fireEvent.click(getByTestId('deleteIcon'))
    await wait(() => {
      expect(getByText('Cancel')).toBeInTheDocument()
    });
  });
});
