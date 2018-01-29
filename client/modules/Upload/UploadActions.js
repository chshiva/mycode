import isServer from 'detect-node';
import Promise from 'bluebird';
import { isDoc, isImage } from './helpers';
import callApi from '../../util/apiCaller';
import {getProfileImage } from '../Login/LoginActions';
import { dispatch } from 'redux';
import store from '../../store';
/*var store = configureStore();
*/
const FileAPI = !isServer ? require('fileapi') : null;

export const THUMBNAIL_WIDTH = 200;
export const THUMBNAIL_HEIGHT = 200;

export const FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS';
export const FILE_UPLOAD_DOCUMENTS_SUCCESS = 'FILE_UPLOAD_DOCUMENTS_SUCCESS';
export const FILE_UPLOAD_ADD_UPLOADING_IMAGES = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES';
export const FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_COMPLETE = 'FILE_UPLOAD_COMPLETE';
export const FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = 'FILE_UPLOAD_MULTIPLE_FILE_UPLOAD';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export const HAS_IMAGE = 'HAS_IMAGE';

function getThumbnails(imageFiles) {
  return Promise.all(
    imageFiles.map(getImageThumbnail)
  );
}

function getImageThumbnail(imageFile) {
  return new Promise((resolve, reject) => {
    FileAPI.Image(imageFile)
    .preview(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)
    .get((err, canvas) => {
      if (err) reject(err);

      resolve({
        dataURL: canvas.toDataURL(),
        file: imageFile
      });
    });
  });
}

export function addUploadingImages(identificator, imageFiles) {
  return {
    type: FILE_UPLOAD_ADD_UPLOADING_IMAGES,
    payload: {
      promise: getThumbnails(imageFiles)
    },
    meta: {
      identificator
    }
  };
}

export function addUploadingDocs(identificator, docFiles) {
  const documentPromise = Promise.all(docFiles);

  return {
    type: FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS,
    payload: {
      promise: documentPromise
    },
    meta: {
      identificator
    }
  };
}



function uploadFile(dispatch, url, identificator, file, data) {
  
  return new Promise(resolve => {
    FileAPI.upload({
      data,
      files: {
        file
        
      },
      complete: resolve,
      fileprogress: (...args) => dispatch(fileProgress(identificator, ...args)),
      filecomplete: (...args) => dispatch(fileComplete(identificator,data, ...args)),
      url
    });
  });
}


export function uploadFiles(identificator, url, files, type, data, concurrency = 2) {
  return params => {
    const dispatch = typeof params === 'function' ? params : params.dispatch;
    const uploadFilePromise = Promise.map(
      files,
      file => uploadFile(dispatch, url, identificator, file, data),
      { concurrency }
    );

    return {
      type: FILE_UPLOAD_MULTIPLE_FILE_UPLOAD,
      payload: {
        promise: uploadFilePromise
      }
    };
  };
}

export function fileProgress(identificator, event, file, fileType) {
  const progress = event.loaded / event.total * 100;

  return {
    type: FILE_UPLOAD_PROGRESS,
    payload: { 
      identificator, 
      file, 
      fileType, 
      progress, 
      isImage: isImage(file), 
      isDoc: isDoc(file) 
    }
  };
}

export function fileComplete(identificator,data, err, xhr, file) {

  if (err) {
     return {
      type: FILE_UPLOAD_ERROR,
      payload: { 
        identificator, 
        file, 
        err, 
        isImage: isImage(file), 
        isDoc: isDoc(file) }
    };
  }
  // const { photo } = JSON.parse(xhr.response);

  
  const image = isImage(file);

  if (image) {
    if(data.type == "profileImage") {

      //tried to import store here

     /* store.dispatch(getProfileImage({ uid: data.userId })).then(res => {
        console.log("profileImage updated");
      })*/
    }
    return {
      type: FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS ,
      payload: {
        file:file.name,
        identificator
      }
    }
  } else {
    return {
      type: FILE_UPLOAD_DOCUMENTS_SUCCESS,
      payload: {
        file,
        identificator
      },
    }
  }
}















