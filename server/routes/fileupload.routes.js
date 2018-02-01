import { Router } from 'express';
import * as FileUploadController from '../controllers/fileupload.controller';

var multer  = require('multer');
const fileUploadRoute = new Router();


fileUploadRoute.route('/upload').post(FileUploadController.upload);
fileUploadRoute.route('/profileupload').post(multer({ dest: process.env.PWD+"/uploads/",limits: { fieldSize: 6 * 1024 * 1024, fileSize : 6 * 1024 * 1024 }}).single('upl'), FileUploadController.profileUpload);
fileUploadRoute.route('/uploadroomtopicfile').post(multer({ dest: process.env.PWD+"/uploads/",limits: { fieldSize: 150 * 1024 * 1024, fileSize : 100 * 1024 * 1024 }}).single('upl'), FileUploadController.uploadRoomTopicFile);
fileUploadRoute.route('/import-users-file').post(multer({ dest: process.env.PWD+"/uploads/",limits: { fieldSize: 50 * 1024 * 1024, fileSize : 20 * 1024 * 1024 }}).single('upl'), FileUploadController.importUsersFile);
fileUploadRoute.route('/list-topic-files').get(FileUploadController.listTopicFiles);
fileUploadRoute.route('/delete-file/:rid/:tid/:id').delete(FileUploadController.deleteFile);
fileUploadRoute.route('/delete-multiple-files/:rid/:tid/:ids').delete(FileUploadController.deleteMultipleFiles);
fileUploadRoute.route('/upload-assignment-submission').post(multer({ dest: process.env.PWD+"/uploads/",limits: { fieldSize: 50 * 1024 * 1024, fileSize : 20 * 1024 * 1024 }}).single('upl'), FileUploadController.uploadAssignmentSubmission);
fileUploadRoute.route('/upload-sharing-document').post(multer({ dest: process.env.PWD+"/uploads/",limits: { fieldSize: 50 * 1024 * 1024, fileSize : 20 * 1024 * 1024 }}).single('upl'), FileUploadController.uploadSharingDocument);
fileUploadRoute.route('/close-shared-document/:name').delete(FileUploadController.deleteSharingDocument);
fileUploadRoute.route('/upload-file-enable/:id').put(FileUploadController.uploadFileEnable);
fileUploadRoute.route('/convert-to-pdf').post(FileUploadController.convertPDF);
// fileUploadRoute.route('/samplefileuplaod').post(FileUploadController.mediaFileUplaod);

export default fileUploadRoute;