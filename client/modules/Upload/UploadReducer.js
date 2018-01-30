import * as actions from './UploadActions';
import UploadingDocument from './UploadingDocument';
import UploadingImage from './UploadingImage';
import { List, Map, Record } from 'immutable';

const InitialState = Record({
  documents: Map(),
  images: Map()
});
const initialState = new InitialState;

function revive() {
  return initialState.merge({
  });
}

export default function fileUploadReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS: {
      const { file, identificator } = action.payload;
      

       
       /*var arrayUploads =[];
       action.payload.forEach(function(value) {
          arrayUploads.push(value);
       })*/

     /*const newUploadingImages = arrayUploads.map(
      uploadingImage => new UploadingImage(uploadingImage)
      ); */
     const newUploadingImages = new UploadingImage(action.payload);

      return state.updateIn(['images', identificator], images =>
        List(images).concat(List(newUploadingImages))
      );
    }
    
    case actions.FILE_UPLOAD_DOCUMENTS_SUCCESS: {
      const { file, identificator } = action.payload;

      console.log('file', file);

      // const newUploadingDocument = action.payload.map(
      //   uploadingDocument => new UploadingDocument({ file: uploadingDocument })
      // );

      const newUploadingDocument = new UploadingDocument({
        file: file,
        fileName: file.name
      });

      return state.updateIn(['documents', identificator], documents =>
        List(documents).concat(List(newUploadingDocument))
      );
    }


    case actions.FILE_UPLOAD_PROGRESS: {
      const { identificator, file, progress, isImage, isDoc } = action.payload;

      if (isImage) {
        return updateUploadingImage(state, identificator, file, uploadingImage =>
          uploadingImage.set('progress', Math.round(progress))
        );
      }  
      if (isDoc) {
        console.log('case matched..calling updateUploadingDocument');
        return updateUploadingDocument(
          state, 
          identificator, 
          file, 
          uploadingDocument => {
            uploadingDocument.set('progress', Math.round(progress))
          }  
        );
      }
      return state;
    }

    case actions.FILE_UPLOAD_ERROR: {
      const { identificator, file, error, isImage, isDoc } = action.payload;
      if (isImage)
        return updateUploadingImage(state, identificator, file, uploadingImage =>
          uploadingImage.set('error', error)
        );
      if (isDoc)
        return updateUploadingDocument(state, identificator, file, uploadingDocument =>
          uploadingDocument.set('error', error)
        );
      return state;
    }

  }

  return state;
}

function updateUploadingImage(state, identificator, file, updater) {
  return state.updateIn(['images', identificator], images =>
    List(images).map(uploadingImage => // eslint-disable-line no-confusing-arrow
      uploadingImage.file === file
        ? updater(uploadingImage)
        : uploadingImage
    )
  );
}

function updateUploadingDocument(state, identificator, file, updater) {

  console.log('state', state);
  console.log('identificator', identificator);
  console.log('file', file);
  console.log('updater', updater);

  return state.updateIn(['documents', identificator], documents => 

    List(documents).map(uploadingDocument => 
      uploadingDocument.file === file ? updater(uploadingDocument) : uploadingDocument
    )
  )
}  