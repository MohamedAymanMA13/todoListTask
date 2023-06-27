import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationENG from 'locales/en/translation.json'
import translationFr from 'locales/ar/translation.json'

// the translations
const resources = {
  ar: {
    translation: translationFr,
  },
  en: {
    translation: translationENG,
  },
}
const Lang = localStorage.getItem('Lang')

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Lang || 'ar',
    fallbackLng: 'ar', // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
