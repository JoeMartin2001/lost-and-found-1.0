import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './src/localization/en/en.json';
import ru from './src/localization/ru/ru.json';
import uz from './src/localization/uz/uz.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    fallbackLng: ['uz', 'ru', 'en'],
  });

export default i18n;
