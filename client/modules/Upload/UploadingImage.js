import { List, Map, Record } from 'immutable';


const UploadingImage = Record({
  dataUrl: null,
  error: null,
  file: null,
  photo: null,
  progress: 0
});

export default UploadingImage;