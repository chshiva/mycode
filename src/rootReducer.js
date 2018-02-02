import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import loginReducer from './login/reducer';

const rootReducer = combineReducers({
     'login': loginReducer
});

 export default rootReducer;