import Promise from 'bluebird';
import isServer from 'detect-node';

// const FileApi = process.env.IS_BROWSER ? require('fileapi') : null;
// const FileApi = require('fileapi');
const FileApi = !isServer ? require('fileapi') : null;



const IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

export function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

export function isDoc(file) {
  return !isImage(file.type);
}

export function filterImageFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) {
      FileApi.getFiles(payload, isImage, resolve);
    } else {
      FileApi.filterFiles(payload, isImage, resolve);
    }
  });
}

export function filterDocFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) {
      FileApi.getFiles(payload, isDoc, resolve);
    } else {
      FileApi.filterFiles(payload, isDoc, resolve);
    }
  });
}


/*
  @summary filters uploaded files 
  @params payload(event) allowedFileTypes(array)
  @returns promise 
*/
export function filterAllowedFiles(payload, allowedFileTypes) {

  //creates a regex from the allowed file extensions
  const allowedFilter = new RegExp(`${allowedFileTypes.join('|')}`, 'i');

  return new Promise(resolve => {

    //check if payload object is instance of React Synthetic Event
    if (payload instanceof Event) {
    
    //get the list of files
      FileApi.getFiles(payload, file => {
        return allowedFilter.test(file.type)
      }, resolve);
    } else {

      //filter the files
      FileApi.filterFiles(payload, file => allowedFilter.test(file.type), resolve);
    }
  });
}