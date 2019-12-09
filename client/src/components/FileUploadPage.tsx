import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FileIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FileServerContext } from '../contexts/FileServerContext';

const FileUploadPage = () => {
  const { state, uploadFiles, deleteFile, getFiles} = useContext(FileServerContext);
  const [open, setOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState('');
  const [latestFiles, setLatestFiles] = useState(['']);

  // initialize list of files
  useEffect(() => {
    getFiles();
  }, []);

  // actions
  const handleClickDelete = (fileName: string) => {
    setFileToDelete(fileName);
    setOpen(true);
  }
  const handleCancelDeleteDialog = () => {
    setOpen(false);
  }
  const handleConfirmDeleteDialog = async () => {
    await deleteFile(fileToDelete);
    setOpen(false);
  }

  const onChangeHandler = async (e: any) => {
    if (e.target.files) {
      const filesUploaded: string[] = await uploadFiles(e.target.files);
      setLatestFiles(filesUploaded)
    }
  }

  // render page
  return (
    <>
      <h1>Welcome to Your File Server!</h1>
      <div>
        <h3>Select Files Here for Upload (50mb limit)</h3>
        <input
          type="file"
          name="files"
          value={[]}
          multiple
          onChange={onChangeHandler}
        />
      </div>

      <h3 className="listHeader">{ state.length } Files: </h3>
      <List>
        { state.map(file => {
          return(
            <ListItem
              className={latestFiles.find(f => f===file) ? 'activeListItem': 'listItem'}
              key={file}
            >
              <ListItemAvatar>
                <Avatar>
                  <FileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={file} className='listText' />
              <DeleteIcon color="secondary" className='deleteIcon'
                onClick={() => {handleClickDelete(file)}}
              />
            </ListItem>
          )
        })}
      </List>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${fileToDelete}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once this file is deleted, you will be unable to recover the file.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteDialog} color="primary" autoFocus>
            Get Rid of It!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FileUploadPage