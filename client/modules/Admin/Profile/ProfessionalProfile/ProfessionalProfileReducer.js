import { GET_USERDATA, GET_USERDATA_FAILED } from './ProfessionalProfileActions'; 

const initialState = {
  data : {}, error : []
};

const ProfessionalProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERDATA:
      return Object.assign({}, state, { data : action.data });
    case GET_USERDATA_FAILED:
      return Object.assign({}, state, { error : action.error });
    default:
      return state;
  }
}

/* Selectors */
export const professionalProfileData  = state => state.professionalprofile;

export default ProfessionalProfileReducer