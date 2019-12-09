import express from 'express';
import fileDeleteController from '../controllers/fileDelete';
import fileListController from '../controllers/fileList';
import fileUploadController from '../controllers/fileUpload';

const router = express.Router();
// router.use(async (req, res, next) => {
// });

router.get('/', fileListController);
router.post('/', fileUploadController);
router.delete('/', fileDeleteController);

export = (() => router)();
