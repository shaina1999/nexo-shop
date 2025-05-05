import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome',
    greeting: 'Hello, {name}!'
  },
  fr: {
    welcome: 'Bienvenue',
    greeting: 'Bonjour, {name}!'
  }
}

const i18n = createI18n({
  legacy: false, // REQUIRED for Composition API support
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n