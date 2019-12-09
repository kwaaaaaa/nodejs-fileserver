import React from 'react';
import './App.css';
import FileUploadPage from './components/FileUploadPage';
import { FileServerProvider } from './contexts/FileServerContext'
import Box from '@material-ui/core/Box';


const App: React.FC = () => {
  return (
    <section className="app">
      <FileServerProvider>
        <Box
          color="primary.secondary"
          bgcolor="background.paper"
        >
          <FileUploadPage />
        </Box>
      </FileServerProvider>
    </section>
  );
}

export default App;