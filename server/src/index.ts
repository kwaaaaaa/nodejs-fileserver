import busboy from 'connect-busboy';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';

import logger from './middlewares/logger';
import fileRouter from './routes/files';
import homeRouter from './routes/home';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5555;

// enable files upload
app.use(fileUpload({
  abortOnLimit: true,
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 },
}));

// middleware
app.use(cors());
app.use(busboy({ immediate: true }));

// routes
app.use('/', homeRouter);
app.use('/files', fileRouter);

// start app
app.listen(PORT, () => {
  logger.info(`🎆 Server listening on P${PORT}. Dev: http://localhost:${PORT}`);
});
