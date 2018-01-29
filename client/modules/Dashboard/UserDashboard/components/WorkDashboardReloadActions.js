
export const RELOAD_TOPIC_LIST = 'RELOAD_TOPIC_LIST';
export const RELOAD_TOPIC_CONTENT = 'RELOAD_TOPIC_CONTENT';
export const RELOAD_POLLS = 'RELOAD_POLLS';
export const RELOAD_UPLOAD_FILES = 'RELOAD_UPLOAD_FILES';
export const RELOAD_TOPIC_QUESTIONNAIRES = 'RELOAD_TOPIC_QUESTIONNAIRES';
export const RELOAD_TOPIC_PDFVIEW = 'RELOAD_TOPIC_PDFVIEW';
export const RELOAD_REMOVED_QUESTIONNAIRES = 'RELOAD_REMOVED_QUESTIONNAIRES';
export const RELOAD_CONDUCT_QUESTION = 'RELOAD_CONDUCT_QUESTION';
export const RELOAD_POLLS_LIST = 'RELOAD_POLLS_LIST';


export function reloadTopicList() {
  return {
      type: RELOAD_TOPIC_LIST
  };
}

export function reloadTopicContent() {
	return {
		type: RELOAD_TOPIC_CONTENT
	}
}

export function reloadUplodFiles() {
	return {
		type: RELOAD_UPLOAD_FILES
	}
}

export function reloadTopicQuestionnaires() {
	return {
		type: RELOAD_TOPIC_QUESTIONNAIRES
	}
}

export function reloadTopicPdfView() {
	return {
		type: RELOAD_TOPIC_PDFVIEW
	}
}

export function reloadConductQuestion(obj){
		return {
      type: RELOAD_CONDUCT_QUESTION
  	};
}

export function reloadQuestionnaire(){
		return {
      type: RELOAD_REMOVED_QUESTIONNAIRES
  	};
}

export function reloadPollsList(obj){
		return {
      type: RELOAD_POLLS_LIST
  	};
}


