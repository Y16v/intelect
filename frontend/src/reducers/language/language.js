import messages from '../../languages/messages';
import {LOCALE_SET, LANGUAGE, getLanguage} from '../../actions/language-local/language-local';
import createReducer from '../utils/base';
import {merge} from 'extend-merge';
import {getUserLocale} from 'get-user-locale';

const userLocale = getLanguage(getUserLocale('logger'));
const language = localStorage.getItem(LANGUAGE, userLocale);

const INITIAL_STATE = {
  lang: language || userLocale,
  messages: messages,
};


export default createReducer({
  [LOCALE_SET]: (state, action) => merge({}, state, {lang: action.lang}),
}, INITIAL_STATE);

