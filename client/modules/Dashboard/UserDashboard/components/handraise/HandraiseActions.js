import callApi from '../../../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../../components/AuthController';
import moment from 'moment';

// export const HANDRAISE_SUBMITTED = 'HANDRAISE_SUBMITTED';

export function saveQuestionRequest(data){
  if (data._id) {
    let id = data._id;
    delete data['_id'];
    return callApi('handraise/' + id, 'put', {
      data : data
    });
  } else {
    return callApi('handraise', 'post', {
      data : data
    });
  }
	
}

export function getHandraiseData(data){
  return callApi('handraise-question/' + data.roomKey +'/' + data.limit, 'get');
}

export function getHandraiseQues(recordId){
  return callApi('handraise-question/' + recordId, 'get');
}

export function sendAnswer(id, answer){
  return callApi('handraise-question-answer/' + id, 'put', {
    data : { answer : answer}
  });
}

export function getAnswers(data){
  return callApi('handraise-answers/' + data._id + '/' + data.limit, 'get');
}

export function deleteQuestion(recordId){
  return callApi('handraise-question/' + recordId, 'delete');
}

export function saveReply(data, qid) {
  return callApi('handraise-answer-reply/' + qid, 'put', {
    data : data
    });
}

export function getReplies(data){
  return callApi('answer-replies/' + data._id + '/' +data.replyOn, 'get');
}