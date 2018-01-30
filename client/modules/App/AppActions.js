import callApi from '../../util/apiCaller';

// Export Constants
export const LEFT_MENU_TOGGLE = 'LEFT_MENU_TOGGLE';

// Export Actions
export function toggleLeftMenu(){
	return {
		type: LEFT_MENU_TOGGLE,
	}
}

export function getFooter() {
	return callApi('get-footer', 'get');
}