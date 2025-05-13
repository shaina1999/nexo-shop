import { createI18n } from 'vue-i18n'
const currentLang = localStorage.getItem('lang')

const messages = {
  en: {
    notificationBarText: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
    shopNowText: "ShopNow",
    nav: {
      home: 'Home',
      contact: 'Contact',
      about: 'About',
    },
    loginText: 'Log In / Join',
    placeholderSearch: 'What are you looking for?'
  },
  fil: {
    notificationBarText: "Summer Sale para sa lahat ng Swimsuit at Libreng Express Delivery – 50% Diskwento!",
    shopNowText: "Mag-shopping Na!",
    nav: {
      home: 'Umpisa',
      contact: 'Kontak',
      about: 'Kilalanin',
    },
    loginText: 'Mag-login / sumali',
    placeholderSearch: 'Ano ang hinahanap mo?'
  }
}

const i18n = createI18n({
  legacy: false, // REQUIRED for Composition API support
  locale: currentLang ? currentLang : 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n