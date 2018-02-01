import _ from 'lodash';

import callApi from '../../../../util/apiCaller';

let sco = null;
let initialized = false;
let datamodel = {};
let errorCode = 301; // errorCode 301 - 'Not Initialized'

const TRUE = 'true';
const FALSE = 'false';


const keywordFields = [
  'cmi.core._children',
  'cmi.core.score._children',
  'cmi.objectives._children',
  'cmi.objectives._count',
  'cmi.student_data._children',
  'cmi.student_preference._children',
  'cmi.interactions._children',
  'cmi.interactions._count',
];

const readonlyFields = [
  'cmi.core.student_id',
  'cmi.core.student_name',
  'cmi.core.credit',
  'cmi.core.entry',
  'cmi.core.total_time',
  'cmi.core.lesson_mode',
  'cmi.launch_data',
  'cmi.comments_from_lms',
  'cmi.student_data.mastery_score',
  'cmi.student_data.max_time_allowed',
  'cmi.student_data.time_limit_action',
];

const writeOnlyFields = [
  'cmi.core.exit',
  'cmi.core.session_time',
];

const errorStrings = {
  0: 'No error',
  101: 'General exception',
  201: 'Invalid argument error',
  202: 'Element cannot have children',
  203: 'Element not an array – cannot have count',
  301: 'Not initialized',
  401: 'Not implemented error',
  402: 'Invalid set value, element is a keyword',
  403: 'Element is read only',
  404: 'Element is write only',
  405: 'Incorrect Data Type',
};

const supportedAPIvariables = {
  'cmi.core._children': 'student_id, student_name, lesson_location, credit, lesson_status, entry, score, total_time, lesson_mode, exit, session_time',
  'cmi.core.score._children': 'raw, min, max',
  'cmi.objectives._children': 'id, score, status',
  'cmi.student_data._children': 'mastery_score, max_time_allowed, time_limit_action',
  'cmi.student_preference._children': 'audio, language, speed, text',
  'cmi.interactions._children': 'id, objectives, time, type, correct_responses, weighting, student_response, result, latency',
};

class ScormAPI {
  constructor(id, roomId, topicId, questionnaireId) {
    sco = id;
    this.roomId = roomId;
    this.topicId = topicId;
    this.questionnaireId = questionnaireId;

    callApi(`scorm-initialize?sco=${sco}`, 'get')
    .then((res) => {
      if (res.success === true) {
        initialized = true;
        datamodel = Object.assign(res.data, supportedAPIvariables);
        errorCode = 0;
      }
    });
  }

  LMSInitialize(param) {
    if (param !== '') {
      errorCode = 201;
      return FALSE;
    }
    errorCode = 0;
    return TRUE;
  }

  LMSFinish(param) {
    if (param !== '') {
      errorCode = 201;
      return FALSE;
    }
    initialized = false;
    errorCode = 0;
    return TRUE;
  }

  LMSGetValue(key) {
    let value = '';

    if (key.endsWith('_count')) {
      this.handleCount(key);
    }

    if (_.includes(writeOnlyFields, key)) {
      errorCode = 404;
      return value;
    }

    if (initialized) {
      if (key in datamodel) {
        value = datamodel[key];
        errorCode = 0;
      } else {
        errorCode = 401;
      }
    } else {
      errorCode = 301;
    }
    return value;
  }

  LMSSetValue(key, value) {
    if (_.includes(keywordFields, key)) {
      errorCode = 402;
      return FALSE;
    }
    if (_.includes(readonlyFields, key)) {
      errorCode = 403;
      return FALSE;
    }
    if (initialized) {
      const obj = {};
      obj[key] = value;

      let params = '';
      if (this.roomId && this.roomId !== undefined
        && this.topicId && this.topicId !== undefined
        && this.questionnaireId && this.questionnaireId !== undefined) {
        params = `&roomId=${this.roomId}&topicId=${this.topicId}&questionnaireId=${this.questionnaireId}`;
      }

      callApi(`scorm-set-value/?sco=${sco}${params}`, 'put', { obj })
      .then((res) => {
        if (res.success === true) {
          datamodel[key] = value;
          errorCode = 0;
          return TRUE;
        }
        return FALSE;
      });
    } else {
      return FALSE;
    }
  }

  LMSCommit(param) {
    if (param !== '') {
      errorCode = 201;
      return FALSE;
    }
    this.errorCode = 0;
    return TRUE;
  }

  LMSGetLastError() {
    return errorCode;
  }

  LMSGetErrorString(errCode) {
    return errorStrings[errCode];
  }

  LMSGetDiagnostic(errCode) {
    return '';
  }

  handleCount(key) {
    switch (key) {
      case 'cmi.objectives._count':
        return 'cmi.objectives' in datamodel ? datamodel['cmi.objectives'].length : 0;

      case 'cmi.interactions._count':
        return 'cmi.interactions' in datamodel ? datamodel['cmi.interactions'].length : 0;

      default:
        return 0;
    }
  }
}

export default ScormAPI;
