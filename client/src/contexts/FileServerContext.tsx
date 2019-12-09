import React, { useReducer } from 'react';
import FileServerReducer from '../reducers/FileServerReducer'
import * as service from '../services/FileServerService'

type FileData = { name: string, mimetype: string, size: number }
type ContextProps = {
  state: string[],
  uploadFiles: (files: string[]) => any,
  deleteFile: (name: string) => void,
  getFiles: () => void,
}
const initialContextProps: ContextProps = {
  state: [],
  uploadFiles: (files: string[]) => {},
  deleteFile: (name: string) => {},
  getFiles: () => {},
}

const FileServerContext = React.createContext<ContextProps>(initialContextProps);
const initialState: string[] = []

const FileServerProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(FileServerReducer, initialState)

  const uploadFiles = async (files: any[]) => {
    const fileList = Array.from(files)
    for (let fileInfo of fileList) {
      if (fileInfo['size'] >= (50*1024*1024)) {
        alert(`file ${fileInfo['name']} is too large.`)
        return []
      }
    }

    let uploaded: string[] = []
    await service.uploadFiles(files)
      .then(res =>  {
        if (res.status) {
          const data: FileData[] = res.data
          uploaded = data.map(f => f.name)
          dispatch({ type: 'UPLOAD_FILES', payload: uploaded })
        } else {
          console.error('unable to upload files', res.error)
          alert(res.error)
        }
      })
      .catch(err => {
        console.error('failed to upload file', err)
      })
    return uploaded
  }

  const deleteFile = async (name: string) => {
    await service.deleteFile(name)
      .then(res =>  {
        console.log(res)
        if (res.status) {
          dispatch({ type: 'DELETE_FILE', payload: name })
        } else {
          console.error(name, res.error)
          alert(res.error)
        }
      })
      .catch(err => {
        alert('Failed to delete file')
        console.error('failed to delete file', err)
      })
  }

  const getFiles = async () => {
    await service.getFileList()
      .then(res => {
        if (res.status) {
          dispatch({ type: 'GET_FILES', payload: res.data })
        } else {
          console.error(res.error)
          alert(res.error)
        }
      })
      .catch(err => {
        alert('Unable to call server to retrieve file  list')
        console.error('failed to delete file', err)
      })
  }

  const value: ContextProps = {
    state,
    uploadFiles,
    deleteFile,
    getFiles,
  }

  return (
    <FileServerContext.Provider
      value={value}
    >
      { children }
    </FileServerContext.Provider>
  );
}

export { FileServerContext, FileServerProvider };