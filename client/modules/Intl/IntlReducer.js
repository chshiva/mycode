import { enabledLanguages, localizationData } from '../../../Intl/setup';
import { SWITCH_LANGUAGE, NO_CHANGE } from './IntlActions';

// const initLocale = global.navigator && global.navigator.language || 'en';
const initLocale = 'en';

const initialState = {
  locale: initLocale,
  setlocale : null,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE: {
      const { type, ...actionWithoutType } = action; // eslint-disable-line
      return { ...state, ...actionWithoutType };
    }
    case NO_CHANGE : return state;
    default:
      return state;
  }
};

export const intlData  = state => state.intl;

export default IntlReducer;
