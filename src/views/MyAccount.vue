<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <form
                v-if="!isFetchingUser"
                class="w-full"
                @submit.prevent="saveProfile"
            >
                <!-- Heading -->
                <div>
                    <h2 class="text-md sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                        Welcome! <span class="text-secondary-500">{{ userData?.user_metadata?.name || userData?.user_metadata?.email }}</span>
                    </h2>
                </div>

                <!-- Grid of inputs -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <input
                            v-model="name"
                            id="name"
                            type="text"
                            placeholder="Md"
                            class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium">Email</label>
                        <input
                            v-model="email"
                            id="email"
                            type="email"
                            placeholder="rimel111@gmail.com"
                            class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                    </div>

                    <div class="md:col-span-2 space-y-2 sm:space-y-4">
                        <h3 class="text-sm font-semibold text-gray-700">Password</h3>

                        <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2">
                            <div>
                                <label for="newPassword" class="block text-sm font-medium">New Password</label>
                                <input
                                    v-model="newPassword"
                                    id="newPassword"
                                    type="password"
                                    placeholder="New Password"
                                    class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                                />
                            </div>

                            <div class="col-span-1">
                                <label for="confirmPassword" class="block text-sm font-medium">Confirm New Password</label>
                                <input
                                    v-model="confirmNewPassword"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <BaseButton
                    class="w-full sm:w-max"
                >
                    Save Changes
                </BaseButton>
            </form>
            <MyAccountSkeleton v-else />
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'

import BaseButton from '@/components/BaseButton.vue'
import MyAccountSkeleton from '@/components/MyAccountSkeleton.vue'

const isFetchingUser = ref(false)
const userData = ref(null)
const name = ref(null)
const email = ref(null)
const newPassword = ref(null)
const confirmNewPassword = ref(null)

const getUser = async () => {
    isFetchingUser.value = true

    try {
        const { data, error } = await supabase.auth.getUser()

        if (error) throw error

        userData.value = data.user

        // update user v-models
        name.value = data.user?.user_metadata?.name
        email.value = data.user?.user_metadata?.email
    } catch (error) {
        console.error('Error fetching user:', error)
    } finally {
        isFetchingUser.value = false
    }
}

onMounted( async () => {
    await getUser()
})
</script>