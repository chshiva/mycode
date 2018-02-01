import { localizationData , loginLanguageType} from '../../../Intl/setup';


// Export Constants
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
export const NO_CHANGE = 'NO_CHANGE';

/*Use lang to pass current language value to loginLangauge function 
as it is calling every time islogged in called. */
let lang = 'en';
let logintype = 'Conference';

export function switchLanguage(newLang, newLoginType, setlocale) {
	console.log("newLang", newLang);
	console.log("newLoginType", newLoginType);
	console.log("setlocale", setlocale);
	lang = newLang;
	logintype = newLoginType;
	loginLanguageType(lang, logintype);
	return {
    type: SWITCH_LANGUAGE,
    setlocale : setlocale,
    ...localizationData[lang],
	};
}

export function loginLanguage(res, setlocale){
	if(setlocale == null){
		let loginType = res && res.profile && res.profile.companyid && res.profile.companyid.businessType ? res.profile.companyid.businessType : 'Conference'; 
		let language = res && res.locale && res.locale.preferedlanguage ? res.locale.preferedlanguage : 'en';
		loginLanguageType(language,loginType);
		return {
	    type: SWITCH_LANGUAGE,
	    setlocale : setlocale,
	    ...localizationData[language],
		};
	}else{
		return {
		    type: NO_CHANGE
		};
	}	
}
