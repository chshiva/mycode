// Import Actions
import { LEFT_MENU_TOGGLE } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  leftMenu: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEFT_MENU_TOGGLE: 
    	return {
    		leftMenu: !state.leftMenu,
    	}
    	break;
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const leftMenuToggle = state => state.app.leftMenu;

// Export Reducer
export default AppReducer;
