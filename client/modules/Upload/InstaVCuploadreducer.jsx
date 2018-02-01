import { FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS,FILE_UPLOAD_DOCUMENTS_SUCCESS,FILE_UPLOAD_ADD_UPLOADING_IMAGES,FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS,FILE_UPLOAD_ERROR,FILE_UPLOAD_COMPLETE,FILE_UPLOAD_MULTIPLE_FILE_UPLOAD,FILE_UPLOAD_PROGRESS,HAS_IMAGE} from './UploadActions';

const initialState = {
 payload:'',toaster:'' ,meta:{}, file:{}/*payload: []*/
};

const UploadsReducer = (state =initialState,action) => {
  console.log("Actions-----");
  console.log(action);
 switch(action.type) {
  case FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS :
     return Object.assign({},state,
      {payload:action.payload,meta:action.meta});
    
  case FILE_UPLOAD_DOCUMENTS_SUCCESS:
    return Object.assign({},state,
     {payload: action.payload});

  case FILE_UPLOAD_ADD_UPLOADING_IMAGES:
      return Object.assign({}, state, 
         {payload:action.payload,meta:action.meta});

    case FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS:
      return Object.assign({}, state,
        {payload: action.payload,file:action.file});
    case FILE_UPLOAD_ERROR:
      return Object.assign({}, state,{payload: action.payload});
    case FILE_UPLOAD_COMPLETE :
    return Object.assign({},state,
      {payload:action.payload.name});
    case FILE_UPLOAD_MULTIPLE_FILE_UPLOAD:
    return Object.assign({},state,
      {payload:action.payload});
    case FILE_UPLOAD_PROGRESS:
    return Object.assign({},state,
      {payload:action.payload});

    case HAS_IMAGE :
    return Object.assign({},state,{payload:action.payload})
    default:
      return state; 
    
    }

}
  export const uploadspayload  = state => state.uploads;
  export default UploadsReducer;