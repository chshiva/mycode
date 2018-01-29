
export const UPDATE_RIGHTBAR = 'UPDATE_RIGHTBAR';

export function setRightBar(obj){
	return (dispatch) => {
		dispatch(updateRightBar(obj));
	}
}

export function updateRightBar(obj){
	return {
      	type: UPDATE_RIGHTBAR,
        data: obj
    };
}