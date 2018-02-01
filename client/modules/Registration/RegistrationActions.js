import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';
import moment from 'moment';

export function saveStudentReq(data){
	return callApi('save-regist-data', 'post', {
    data 
  })
}



  