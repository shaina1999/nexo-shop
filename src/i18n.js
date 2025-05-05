import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    notificationBarText: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
    shopNowText: "ShopNow",
  },
  fil: {
    notificationBarText: "Summer Sale para sa lahat ng Swimsuit at Libreng Express Delivery – 50% Diskwento!",
    shopNowText: "Mag-shopping Na!",
  }
}

const i18n = createI18n({
  legacy: false, // REQUIRED for Composition API support
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n