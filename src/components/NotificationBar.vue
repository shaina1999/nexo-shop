<template>
    <div class="bg-black">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl mx-auto text-white min-h-12 flex items-center justify-between gap-4 md:gap-6 py-2 md:py-0">
            <div class="hidden md:block"></div>
            <div class="text-sm">
                <span class="inline-block mr-0 md:mr-3">{{ t('notificationBarText') }}</span>
                <RouterLink to="/products"><span class="font-medium underline">{{ t('shopNowText') }}</span></RouterLink>
            </div>
            <div class="relative shrink-0">
                <button 
                    class="text-sm flex item-center gap-1 sm:gap-2 cursor-pointer"
                    @click="showDropdown = !showDropdown"
                    ref="dropdown-button"
                >
                    <div class="flex items-center shrink-0">
                        <span class="mr-1.5 inline-bloc">{{ selectedLanguageStr }}</span>
                        <img :src="flag" :alt="flagAltTezt" class="size-4.5">
                    </div>
                    <PhCaretDown :size="20" class="shrink-0" />
                </button>
                <div 
                    class="text-sm bg-black absolute py-3 px-4 flex flex-col gap-y-3 rounded-sm text-white top-10 right-0 z-10"
                    :class="{ 'hidden': !showDropdown, 'block' : showDropdown }"
                >
                    <button 
                        class="relative flex items-center gap-2 hover:underline"
                        :class="{  'font-semibold' : languageOption.active}"
                        v-for="(languageOption, index) in languageOptions" :key="index"
                        @click="updateLanguage(languageOption.value)" 
                    >
                        <span>{{ languageOption.label }}</span>
                        <PhCheck :size="20" :class="{ 'hidden' : !languageOption.active }" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch, useTemplateRef, onMounted} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'

const languageOptions = ref([
    {id: 1, value: 'en', flag: '/src/assets/img/united-states.png', flagAltText: 'Flag of the United States',  label: 'EN', active: true},
    {id: 2, value: 'fil', flag: '/src/assets/img/philippines.png', flagAltText: 'Flag of the Philippines',  label: 'FIL', active: false}
])

const selectedLanguage = ref('en')
const selectedLanguageStr = ref('EN')
const flag = ref('/src/assets/img/united-states.png')
const flagAltTezt = ref('Flag of the United States')
const dropdownButtonRef = useTemplateRef('dropdown-button')
const showDropdown = ref(false)
const { t, locale } = useI18n()
const router = useRouter()

const updateLanguage = (newLanguage) => {
    NProgress.start()
    selectedLanguage.value = newLanguage
    locale.value = newLanguage
    localStorage.setItem('lang', newLanguage)

    languageOptions.value.forEach(option => {
        option.active = option.value === newLanguage

        if (option.active) {
            selectedLanguageStr.value = option.label
            flag.value = option.flag
            flagAltTezt.value = option.flagAltText
        }
        NProgress.done()
    })
}

onClickOutside(dropdownButtonRef, event => showDropdown.value = false)

onMounted(() => {
    updateLanguage(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en')
})
</script>

<style scoped></style>