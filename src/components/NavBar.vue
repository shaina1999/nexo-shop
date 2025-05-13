<template>
    <div class="border-b-black border-b-[0.5px] bg-white w-full flex items-center justify-center">
        <nav 
            class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl grid grid-cols-2 gap-y-2.5 lg:flex lg:items-center lg:justify-between pt-4 lg:pt-10 pb-4"
        >
            <!-- Logo -->
            <RouterLink to="/">
                <span class="text-2xl font-bold">NexoShop</span>
            </RouterLink>

            <!-- Nav Links -->
            <NavLinks class="items-center gap-8 xl:gap-10 hidden lg:flex" />

            <!-- Hamburger Button -->
            <BaseButtonIcon
                class="flex lg:hidden justify-end ml-auto w-max"
                @click="toggleMobileNav"
            >
                <template v-slot:icon>
                    <PhList :size="32" />
                </template>
            </BaseButtonIcon>

            <!-- Desktop Nav -->
            <div class="flex items-center gap-3 lg:gap-6 col-span-2 lg:col-span-0">
                <div class="py-2 px-2 bg-gray-200 flex gap-3 item-center rounded-sm w-full lg:w-max relative">
                    <input 
                        :placeholder="'What are you looking for?'"
                        class="outline-none :focus-visible:outline-none focus-within:outline-none w-full lg:w-max text-sm lg:text-base"
                        v-model="searchTerm"
                        @keyup.enter="searchProduct(null, searchTerm)"
                        @keydown="handleArrowKey(0, $event)"
                        @input="showSuggestions"
                    >
                    <BaseButtonIcon @click="searchProduct(null, searchTerm)" class="hover:text-secondary-500 transition-all duration-300 ease-in-out">
                        <template v-slot:icon>
                            <PhMagnifyingGlass :size="22" />
                        </template>
                    </BaseButtonIcon>
                    <ul 
                        v-if="filteredSuggestions.length"
                        class="absolute w-full h-max top-[42px] bg-white right-0 py-2 px-4 border-t-[1px] border-t-white shadow-md flex-col gap-4 cursor-pointer max-h-max overflow-hidden"
                        :class="{ 'flex' : isSearching, 'hidden' : !isSearching }"
                        ref="searchResultsContainerRef"
                    >
                        <li 
                            ref="focusableItemRef"
                            class="hover:text-secondary-500 focus-within:outline-none focus-visible:outline-none focus-within:text-secondary-500 focus-visible:text-secondary-500" 
                            tabindex="0" 
                            v-for="(item, index) in filteredSuggestions" 
                            :key="index" @keyup.enter="searchProduct(item, null)" 
                            @click="searchProduct(item, null)"
                            @keydown="handleArrowKey($event.key === 'ArrowDown' ? index + 1 : index, $event)"
                        >
                            {{ item.value }}
                        </li>
                    </ul>
                </div>
                <RouterLink to="/wishlist" class="hover:text-secondary-500 transition-all duration-300 ease-in-out"><PhHeart :size="26" /></RouterLink>
                <RouterLink to="/cart" class="hover:text-secondary-500 transition-all duration-300 ease-in-out"> <PhShoppingCart :size="26" /></RouterLink>
                <div v-if="auth.user" class="flex items-center relative" ref="profileDropdownContainer">
                    <button class="cursor-pointer" @click.prevent.stop="toggleProfileDropdown"><PhUserCircle :size="27" /></button>
                    <ul 
                        class="items-baseline flex-col gap-5 profile-dropdown absolute bottom-[-236px] left-[-177px] sm:bottom-[-244px] sm:left-[-194px] z-50 py-4 px-6 rounded-sm shadow-2xl bg-white text-black border-[1px] border-gray-300 w-max"
                        :class="{ 'hidden' : !dropdownShow, 'flex' : dropdownShow }"
                    >
                        <li v-for="(item, index) in profileOptions" :key="index" class="text-black text-sm sm:text-base hover:text-secondary-500 transition-all duration-300 ease-in-out">
                            <RouterLink 
                                v-if="item.type === 'link'" 
                                class="flex items-center gap-3" 
                                :to="item.to"
                                @click="dropdownShow = false"
                            >
                                <component :is="item.icon" :size="22" />
                                <span>{{ item.label }}</span>
                            </RouterLink>
                            <button v-else class="flex items-center gap-3 cursor-pointer" @click.prevent="handleLogout">
                                <component :is="item.icon" :size="22" />
                                <span>{{ item.label }}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Mobile Nav -->
            <Teleport to="body">
                <div 
                    class="fixed top-0 w-[100vw] bg-white h-screen px-4 shadow-md z-10 transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                    :class="{
                        'translate-x-0 pointer-events-all': isMobileNavOpen,
                        'translate-x-full pointer-events-none': !isMobileNavOpen,
                        'hidden' : isResizing
                    }"
                >
                    <BaseButtonIcon
                        class="flex justify-end ml-auto mt-4"
                        @click="toggleMobileNav"
                    >
                        <template v-slot:icon>
                           <PhX :size="22" />
                        </template>
                    </BaseButtonIcon>
                    <NavLinks class="flex flex-col gap-y-10 h-screen items-center mt-8" />
                </div>
            </Teleport>
        </nav>
    </div>
</template>

<script setup>
import { computed, ref, watch, useTemplateRef, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import searchSuggestions from '@/assets/js/searchSuggestions'
import { onClickOutside } from '@vueuse/core'
import BaseButtonIcon from '@/components/BaseButtonIcon.vue'
import NavLinks from '@/components/NavLinks.vue'

const router = useRouter()
const route = useRoute()
const isMobileNavOpen = ref(false)
const searchTerm = ref('')
const isSearching = ref(false)
const searchResultsContainerRef = useTemplateRef('searchResultsContainerRef')
const focusableItemsRef = useTemplateRef('focusableItemRef')
const filteredSuggestions = ref([])
const isResizing = ref(false)
const auth = useAuthStore()
const dropdownShow = ref(false)
const profileDropdownContainer = useTemplateRef('profileDropdownContainer')

const profileOptions = ref([
    {
        label: 'My Account',
        icon: 'PhUser',
        to: '/my-account',
        type: 'link',
    },
    {
        label: 'My Orders',
        icon: 'PhBag',
        to: '/my-orders',
        type: 'link',
    },
    {
        label: 'My Reviews',
        icon: 'PhStar',
        to: '/my-reviews',
        type: 'link',
    },
    {
        label: 'My Cancellations',
        icon: 'PhCalendarX',
        to: '/my-cancellations',
        type: 'link',
    },
    {
        label: 'Logout',
        icon: 'PhSignOut',
        action: 'logout',
        type: 'button',
    },
])

const toggleMobileNav = () => {
    isMobileNavOpen.value = !isMobileNavOpen.value
}

const searchProduct = (qObj, q) => {
    if (searchTerm.value) {
        isSearching.value = false;
        filteredSuggestions.value = [] // Reset filtered search suggestions

        const query = qObj?.value
            ? { q: qObj.value, key: qObj.category ?? '' }
            : { q: q ?? '' };

        router.push({ path: '/products', query });   
    }
};

const handleArrowKey = (index, event) => {
    if (event.key === 'ArrowDown') {
        const next = focusableItemsRef.value[index]
        if (next) next.focus()
    }

    if (event.key === 'ArrowUp') {
        const prev = focusableItemsRef.value[index - 1]
        if (prev) prev.focus()
    }
}

const showSuggestions = () => {
    const term = searchTerm.value.trim()
    if (!term) return []

    const regex = new RegExp(`^${term}`, 'i')

    filteredSuggestions.value = searchSuggestions.filter((suggestion) =>
        regex.test(suggestion.value) || regex.test(suggestion.category)
    ).slice(0, 10)
}

const handleResize = () => {
    isResizing.value = true
    setTimeout(() => {
        isResizing.value = false
    }, 100);
}

const toggleProfileDropdown = () => {
    dropdownShow.value = !dropdownShow.value
}

const logout = async () => {
    await auth.logout()
}

const handleLogout = async () => {
  dropdownShow.value = false
  await logout()
}

watch(route, () => {
    isMobileNavOpen.value = false

    // Update the searchTerm based on the query parameter from the route
    searchTerm.value = route.query?.q || ''
})

watch(searchTerm, () => {
    if (searchTerm.value) {
        isSearching.value = true
    } else {
        isSearching.value = false
    }
})

watch(isMobileNavOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

onClickOutside(searchResultsContainerRef, event => isSearching.value = false)
onClickOutside(profileDropdownContainer, event => dropdownShow.value = false)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>