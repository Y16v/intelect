export const LOCALE_SET = 'LOCALE_SET';
export const LANGUAGE = 'LANGUAGE';
export const getLanguage = (lang) => {
  if (['ru', 'RU', 'ru-Ru', 'kg', 'KG', 'kg-KG'].includes(lang)) {
    return 'ru';
  } else {
    return 'en';
  }
};

export const localeSet = (lang) => ({
  type: LOCALE_SET,
  lang,
});

export const setLocale = (lang) => (dispatch) => {
  localStorage.setItem(LANGUAGE, lang);
  dispatch(localeSet(lang));
};
